import { useEffect, useState } from 'react';
import UserFilters from './components/UserFilters';
import UserList from './components/UserList';
import UserStatCard from './components/UserStatCard';
import FormModal from '../../components/ui/Modal/FormModal';
import UserForm from './components/UserForm';
import styles from './UsuariosView.module.css';
import { createUser, getAllUsers, updateUser } from './services';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import { useSearchParams } from 'react-router-dom';
import UserDetailsModal from './components/UserDetailsModal';

export default function UsuariosView() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('info');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    rol: 'all'
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const rolParam = searchParams.get('rol');
  console.log(rolParam)

  const stats = [
    {
      id: 1,
      title: 'Usuarios Totales',
      value: users.length,
      type: 'total',
      action: () => setFilters(prev => ({ ...prev, rol: 'all', status: 'all' }))
    },
    {
      id: 2,
      title: 'Usuarios Activos',
      value: users.filter(u => u.status).length,
      type: 'active',
      action: () => setFilters(prev => ({ ...prev, rol: 'all', status: 'active' }))
    },
    {
      id: 3,
      title: 'Administradores',
      value: users.filter(u =>
        u.roles?.includes('ROLE_ADMIN')
      ).length,
      type: 'admin',
      action: () => setFilters(prev => ({ ...prev, rol: 'ADMIN', status: 'all' }))
    },
    {
      id: 4,
      title: 'Inactivos',
      value: users.filter(u => !u.status).length,
      type: 'inactive',
      action: () => setFilters(prev => ({ ...prev, rol: 'all', status: 'inactive' }))
    }
  ];

  // 🔥 Cargar usuarios
  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
    if (rolParam) {
      console.log("filtro")
      setFilters(prev => ({
        ...prev,
        rol: rolParam
      }));
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 🔥 SUBMIT (CREAR / EDITAR)
  const handleUserSubmit = async (userData) => {
    if (!userData) {
      setIsUserModalOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = mapUserToRequest(userData, { isEdit: Boolean(selectedUser) });
      if (selectedUser) {
        await updateUser(selectedUser.numeroDocumento, data);
        setMessage("Usuario modificado correctamente");
      } else {
        await createUser(data);
        setMessage("Usuario guardado correctamente");
      }

      await fetchUsers(); // 🔥 recargar lista

      setTitle("Success");
      setType("success");
      setShowModal(true);

    } catch (err) {
      const type = (selectedUser) ? "modificar" : "registrar";
      let errorMessage = err.message || `No se pudo ${type} el usuario`;

      if (err?.errores) {
        errorMessage = (
          <ul>
            {Object.entries(err.errores).map(([campo, mensaje], index) => (
              <li key={index}>
                <strong>▪</strong> {mensaje}
              </li>
            ))}
          </ul>
        );
      }

      setMessage(errorMessage);
      setTitle("Error");
      setType("error");
      setShowModal(true);
    }

    setSelectedUser(null);
    setIsUserModalOpen(false);
    setIsLoading(false);
  };

  // 🔥 Abrir modal para editar
  const handleUpdateUser = (user) => {
    const mappedUser = mapUserToForm(user);
    setSelectedUser(mappedUser);
    setIsUserModalOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUserDetails(user);
    setIsUserDetailsModalOpen(true);
  };

  const handleCloseUserDetailsModal = () => {
    setIsUserDetailsModalOpen(false);
    setSelectedUserDetails(null);
  };

  const handleAskDeleteUser = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsLoading(true);

    try {
      const updatedUser = {
        ...userToDelete,
        status: !userToDelete.status
      };

      const data = mapUserToRequest(updatedUser);

      await updateUser(userToDelete.documento.numero, data);

      await fetchUsers();

      setTitle("Success");
      setType("success");
      setMessage(
        userToDelete.status
          ? "Usuario desactivado correctamente"
          : "Usuario reactivado correctamente"
      );
      setShowModal(true);

    } catch (err) {
      setTitle("Error");
      setType("error");
      setMessage("No se pudo actualizar el estado del usuario");
      setShowModal(true);
    }

    setConfirmOpen(false);
    setUserToDelete(null);
    setIsLoading(false);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  // 🔥 Mapper backend → form
  const mapUserToForm = (user) => {
    return {
      nombre: user.nombre || user.nombres || '',
      apellido: user.apellido || user.apellidos || '',
      tipoDocumento: user.documento?.tipo || '',
      numeroDocumento: user.documento?.numero || '',
      correo: user.correo || '',
      telefono: user.telefono || '',
      direccion: {
        tipoVia: user.direccion?.tipoVia || '',
        numero: user.direccion?.numero || '',
        numeroSecundario: user.direccion?.numeroSecundario || '',
        numeroTercero: user.direccion?.numeroTercero || '',
        complemento: user.direccion?.complemento || ''
      },
      mecanico: {
        especialidades: user.mecanicoPerfil?.especialidades || user.mecanico?.especialidades || user.especialidades || [],
        aniosExperiencia: user.mecanicoPerfil?.aniosExperiencia || user.mecanico?.aniosExperiencia || user.anioExp || '',
        descripcion: user.mecanicoPerfil?.descripcion || user.mecanico?.descripcion || '',
        disponible: typeof user.mecanicoPerfil?.disponible === 'boolean'
          ? user.mecanicoPerfil.disponible
          : typeof user.mecanico?.disponible === 'boolean'
            ? user.mecanico.disponible
            : true
      },
      roles: Array.isArray(user.roles) ? user.roles : ['ROLE_CLIENTE']
    };
  };

  const mapUserToRequest = (user, { isEdit = false } = {}) => {
    const normalizedRoles = Array.isArray(user.roles)
      ? user.roles
      : Array.isArray(user.rol)
        ? user.rol
        : user.roles
          ? [user.roles]
          : ['ROLE_CLIENTE'];

    const normalizedDireccion = user.direccion ? {
      tipoVia: user.direccion?.tipoVia || '',
      numero: user.direccion?.numero || '',
      numeroSecundario: user.direccion?.numeroSecundario || '',
      numeroTercero: user.direccion?.numeroTercero || '',
      complemento: user.direccion?.complemento || ''
    } : null;

    const hasAddressValues = normalizedDireccion && Object.values(normalizedDireccion).some((value) => value);
    const direccionCompleta = user.direccionCompleta || (
      hasAddressValues
        ? [normalizedDireccion.tipoVia, normalizedDireccion.numero, normalizedDireccion.numeroSecundario, normalizedDireccion.numeroTercero, normalizedDireccion.complemento]
          .filter(Boolean)
          .join(' ')
        : ''
    );

    const payload = {
      tipoDocumento: user.tipoDocumento || user.documento?.tipo,
      numeroDocumento: user.numeroDocumento || user.documento?.numero,

      nombres: user.nombre?.trim() || user.nombres?.trim(),
      apellidos: user.apellido?.trim() || user.apellidos?.trim(),

      telefono: user.telefono?.trim(),
      correo: user.correo?.trim(),

      roles: normalizedRoles,
      status: typeof user.status === 'boolean' ? user.status : true
    };

    payload.direccionCompleta = direccionCompleta;
    payload.direccion = hasAddressValues ? normalizedDireccion : null;

    if (!isEdit) {
      payload.password = user.password || 'Password123!';
    }

    if (normalizedRoles.includes('ROLE_MECANICO')) {
      payload.especialidades = Array.isArray(user.mecanico?.especialidades)
        ? user.mecanico.especialidades
        : Array.isArray(user.especialidades)
          ? user.especialidades
          : [];
      payload.disponible = typeof user.mecanico?.disponible === 'boolean'
        ? user.mecanico.disponible
        : typeof user.disponible === 'boolean'
          ? user.disponible
          : true;
      payload.aniosExperiencia = Number(user.mecanico?.aniosExperiencia ?? user.mecanicoPerfil?.aniosExperiencia ?? 0);
      payload.descripcion = user.mecanico?.descripcion || user.mecanicoPerfil?.descripcion || '';
    }

    return payload;
  };

  const filteredUsers = users.filter(user => {

    // 🔍 BUSCADOR
    const searchMatch =
      user.documento.numero?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.nombre?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.correo?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.roles?.some(r => r.toLowerCase().includes(filters.search.toLowerCase()));

    // 🔘 ESTADO
    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'active' && user.status) ||
      (filters.status === 'inactive' && !user.status);

    // ROl
    const rolMatch =
      filters.rol === 'all' ||
      user.roles?.includes(`ROLE_${filters.rol}`);

    return searchMatch && statusMatch && rolMatch;
  });


  return (
    <>
      {isLoading && <LoadingModal mensaje="Procesando..." />}

      {showModal && (
        <Modal
          title={title}
          message={message}
          onClose={handleCloseModal}
          type={type}
        />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title={userToDelete?.status ? "Desactivar usuario" : "Reactivar usuario"}
        message={
          userToDelete?.status
            ? `¿Estás seguro de que deseas desactivar al usuario ${userToDelete?.nombre}? Esta acción podrá revertirse más adelante.`
            : `¿Deseas reactivar al usuario ${userToDelete?.nombre}?`
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gestión de Usuarios</h1>
          <p className={styles.subtitle}>
            Administra los accesos y roles del personal del taller
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats && stats.map(stat => (
            <UserStatCard key={stat.id} {...stat} onClick={stat.action} />
          ))}
        </div>

        <UserFilters
          filters={filters}
          onFilterChange={setFilters}
          onOpenNewUser={() => {
            setSelectedUser(null);
            setIsUserModalOpen(true);
          }}
        />

        <UserList users={filteredUsers} onUpdateUser={handleUpdateUser} onViewUser={handleViewUser} onDeleteUser={handleAskDeleteUser} />

        {isUserModalOpen && (
          <FormModal
            isOpen={isUserModalOpen}
            onClose={() => setIsUserModalOpen(false)}
            title={selectedUser ? "Modificar Usuario" : "Agregar Usuario"}
          >
            <UserForm
              initialData={selectedUser}
              onSubmit={handleUserSubmit}
            />
          </FormModal>
        )}

        <UserDetailsModal
          isOpen={isUserDetailsModalOpen}
          onClose={handleCloseUserDetailsModal}
          user={selectedUserDetails}
        />
      </div>
    </>
  );
}