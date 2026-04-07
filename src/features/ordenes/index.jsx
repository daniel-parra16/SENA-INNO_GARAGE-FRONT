import { useEffect, useState } from 'react';
import OrdenList from './components/OrdenList/OrdenList';
import OrdenForm from './components/OrdenForm/OrdenForm';
import OrdenFilters from './components/OrdenFilters/OrdenFilters';
import OrdenStatCard from './components/OrdenStatCard/OrdenStatCard';

import FormModal from '../../components/ui/Modal/FormModal';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';

import {
  getAllOrdenes,
  createOrden,
  updateOrden,
  deleteOrden,
  changeEstado,
  convertToOrden
} from './services';

import styles from './OrdenesView.module.css';

export default function OrdenesView() {

  const [ordenes, setOrdenes] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    estado: 'all',
    tipo: 'all'
  });

  const [selectedOrden, setSelectedOrden] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('info');

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ordenToDelete, setOrdenToDelete] = useState(null);

  // 🔥 FETCH
  const fetchOrdenes = async () => {
    try {
      const data = await getAllOrdenes({
        busqueda: filters.search,
        estado: filters.estado !== 'all' ? filters.estado : '',
        tipo: filters.tipo !== 'all' ? filters.tipo : ''
      });

      setOrdenes(data.content || []);
    } catch {
      setTitle("Error");
      setType("error");
      setMessage("No se pudieron cargar las órdenes");
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, [filters]);

  // 🔥 SUBMIT
  const handleSubmit = async (data) => {

    setIsLoading(true);

    try {
      if (selectedOrden) {
        await updateOrden(selectedOrden.id, data);
        setMessage("Orden actualizada correctamente");
      } else {
        await createOrden(data);
        setMessage("Cotización creada correctamente");
      }

      setTitle("Success");
      setType("success");
      setShowModal(true);

      await fetchOrdenes();

    } catch (err) {
      setTitle("Error");
      setType("error");
      setMessage(err.message || "Error al guardar");
      setShowModal(true);
    }

    setIsModalOpen(false);
    setSelectedOrden(null);
    setIsLoading(false);
  };

  // 🔥 DELETE
  const handleConfirmDelete = async () => {

    setIsLoading(true);

    try {
      await deleteOrden(ordenToDelete.id);

      setTitle("Success");
      setType("success");
      setMessage("Orden desactivada correctamente");

      await fetchOrdenes();

    } catch {
      setTitle("Error");
      setType("error");
      setMessage("No se pudo eliminar");
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
        <Modal
          title={title}
          message={message}
          onClose={() => setShowModal(false)}
          type={type}
        />
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
          <h1 className={styles.title}>Órdenes y Cotizaciones</h1>
          <p className={styles.subtitle}>
            Administra las ordenes del taller
          </p>
        </div>

        <OrdenFilters
          filters={filters}
          onFilterChange={setFilters}
          onNew={() => {
            setSelectedOrden(null);
            setIsModalOpen(true);
          }}
        />

        <OrdenList
          ordenes={ordenes}
          onEdit={(o) => {
            setSelectedOrden(o);
            setIsModalOpen(true);
          }}
          onDelete={(o) => {
            setOrdenToDelete(o);
            setConfirmOpen(true);
          }}
          onChangeEstado={changeEstado}
          onConvert={convertToOrden}
        />

        {isModalOpen && (
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedOrden ? "Editar Orden" : "Nueva Cotización"}
          >
            <OrdenForm
              initialData={selectedOrden}
              onSubmit={handleSubmit}
            />
          </FormModal>
        )}
      </div>
    </>
  );
}