import { useEffect, useState } from 'react';
import OrdenList from './components/OrdenList';
import OrdenForm from './components/OrdenForm';
import OrdenFilters from './components/OrdenFilters';

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
import OrdenStatCard from './components/OrdenStatCard';

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

  const estadosCotizacion = [
    'COTIZACION_PENDIENTE',
    'COTIZACION_APROBADA',
    'COTIZACION_RECHAZADA',
    'COTIZACION_VENCIDA'
  ];

  const estadosOrden = [
    'ORDEN_RECIBIDO',
    'ORDEN_EN_DIAGNOSTICO',
    'ORDEN_ESPERANDO_REPUESTOS',
    'ORDEN_EN_REPARACION',
    'ORDEN_LISTA',
    'ORDEN_ENTREGADA',
    'ORDEN_CANCELADA'
  ];

  const getCountByEstado = (estado) => {
    return ordenes.filter(o => o.estado === estado).length;
  };

  // 🔥 FETCH
  const fetchOrdenes = async () => {
    try {
      const data = await getAllOrdenes({
        busqueda: filters.search,
        estado: filters.estado !== 'all' ? filters.estado : '',
        tipo: filters.tipo !== 'all' ? filters.tipo : ''
      });

      setOrdenes(data.contenido || []);
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

        <div className={styles.dualGrid}>

          <OrdenStatCard
            title="Órdenes"
            estados={estadosOrden}
            getCount={getCountByEstado}
            onClickEstado={(estado) =>
              setFilters(prev => ({ ...prev, estado }))
            }
          />

          <OrdenStatCard
            title="Cotizaciones"
            estados={estadosCotizacion}
            getCount={getCountByEstado}
            onClickEstado={(estado) =>
              setFilters(prev => ({ ...prev, estado }))
            }
          />

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
          onRefresh={fetchOrdenes}
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
              onClose={() => setIsModalOpen(false)}
            />
          </FormModal>
        )}
      </div>
    </>
  );
}