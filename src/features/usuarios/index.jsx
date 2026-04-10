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
    status: 'all'
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const stats = [
    {
      id: 1,
      title: 'Usuarios Totales',
      value: users.length,
      type: 'total',
    },
    {
      id: 2,
      title: 'Usuarios Activos',
      value: users.filter(u => u.status).length,
      type: 'active',
    },
    {
      id: 3,
      title: 'Administradores',
      value: users.filter(u =>
        u.roles?.includes('ROLE_ADMIN')
      ).length,
      type: 'admin',
    },
    {
      id: 4,
      title: 'Inactivos',
      value: users.filter(u => !u.status).length,
      type: 'inactive',
    }
  ];

  // 🔥 Cargar usuarios
  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
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
      const data = mapUserToRequest(userData)
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
        status: !userToDelete.status // 🔥 toggle
      };

      const data = mapUserToRequest({
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        tipoDocumento: updatedUser.documento.tipo,
        numeroDocumento: updatedUser.documento.numero,
        correo: updatedUser.correo,
        telefono: updatedUser.telefono,
        roles: mapRoleFromBackend(updatedUser.roles?.[0]),
        especialidad: updatedUser.especialidad,
        certificado: updatedUser.certificado,
        anioExp: updatedUser.anioExp,
      });

      data.status = !userToDelete.status; // 🔥 importante

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
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      tipoDocumento: user.documento?.tipo || '',
      numeroDocumento: user.documento?.numero || '',
      correo: user.correo || '',
      telefono: user.telefono || '',
      especialidad: user.especialidad || '',
      certificado: user.certificado || '',
      anioExp: user.anioExp || '',
      roles: mapRoleFromBackend(user.roles?.[0])
    };
  };

  const mapUserToRequest = (user) => {
    return {
      tipoDocumento: user.tipoDocumento,
      numeroDocumento: user.numeroDocumento,

      nombres: user.nombre?.trim(),
      apellidos: user.apellido?.trim(),

      telefono: user.telefono?.trim(),
      correo: user.correo?.trim(),

      rol: mapRoleToBackend(user.roles),

      ...(user.roles === "mecanico" && {
        especialidad: user.especialidad || null,
        certificado: user.certificado || null,
        anioExp: user.anioExp || null,
      }),
    };
  };

  const mapRoleFromBackend = (rol) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "admin";
      case "ROLE_MECANICO":
        return "mecanico";
      default:
        return "cliente";
    }
  };

  const mapRoleToBackend = (rol) => {
    switch (rol) {
      case "admin":
        return "ROLE_ADMIN";
      case "mecanico":
        return "ROLE_MECANICO";
      default:
        return "ROLE_CLIENTE";
    }
  };

  const filteredUsers = users.filter(user => {

    // 🔍 BUSCADOR
    const searchMatch =
      user.nombre?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.correo?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.roles?.some(r => r.toLowerCase().includes(filters.search.toLowerCase()));

    // 🔘 ESTADO
    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'active' && user.status) ||
      (filters.status === 'inactive' && !user.status);

    return searchMatch && statusMatch;
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
          {stats.map(stat => (
            <UserStatCard key={stat.id} {...stat} />
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

        <UserList users={filteredUsers} onUpdateUser={handleUpdateUser} onDeleteUser={handleAskDeleteUser} />

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
      </div>
    </>
  );
}