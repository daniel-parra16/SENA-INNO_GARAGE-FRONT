import { useEffect, useState } from 'react';
import { useAuth } from '../../store/authContext';
import OrdenList from './components/OrdenList';
import OrdenFilters from './components/OrdenFilters';

import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';

import { getAllOrdenes, deleteOrden, changeEstado } from './services';

import styles from './OrdenesView.module.css';

export default function OrdenesView() {
  const { user } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [filters, setFilters] = useState({ search: '', estado: 'all', page: 0, size: 20 });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('info');

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ordenToDelete, setOrdenToDelete] = useState(null);

  const fetchOrdenes = async () => {
    setIsLoading(true);
    try {
      const params = { page: filters.page, size: filters.size };
      if (filters.search?.trim()) params.busqueda = filters.search.trim();
      if (filters.estado && filters.estado !== 'all') params.estado = filters.estado;

      const data = await getAllOrdenes(params);
      setOrdenes(data.contenido || []);
    } catch {
      setTitle('Error');
      setType('error');
      setMessage('No se pudieron cargar las órdenes');
      setShowModal(true);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchOrdenes(); }, [filters]);

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteOrden(ordenToDelete.id);
      setTitle('Éxito');
      setType('success');
      setMessage('Orden desactivada correctamente');
      await fetchOrdenes();
    } catch {
      setTitle('Error');
      setType('error');
      setMessage('No se pudo eliminar');
    }
    setConfirmOpen(false);
    setOrdenToDelete(null);
    setIsLoading(false);
    setShowModal(true);
  };

  return (
    <>
      {isLoading && <LoadingModal mensaje="Procesando..." />}

      {showModal && (
        <Modal title={title} message={message} onClose={() => setShowModal(false)} type={type} />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title="Eliminar orden"
        message="¿Seguro que deseas desactivar esta orden?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Órdenes</h1>
          <p className={styles.subtitle}>Administra las órdenes del taller</p>
        </div>

        <OrdenFilters filters={filters} onFilterChange={setFilters} />

        <OrdenList
          ordenes={ordenes}
          canEdit={user?.rol !== 'cliente'}
          onDelete={(o) => { setOrdenToDelete(o); setConfirmOpen(true); }}
          onChangeEstado={changeEstado}
          onRefresh={fetchOrdenes}
        />
      </div>
    </>
  );
}