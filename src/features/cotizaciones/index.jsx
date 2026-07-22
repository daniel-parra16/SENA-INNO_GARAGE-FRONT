import { useEffect, useState } from 'react';
import CotizacionList from './components/CotizacionList';
import CotizacionFilters from './components/CotizacionFilters';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import FormModal from '../../components/ui/Modal/FormModal';
import CotizacionForm from './components/CotizacionForm';
import { getAllCotizaciones, createCotizacion, updateCotizacion, deleteCotizacion, cambiarEstadoCotizacion } from './services';
import styles from './CotizacionesView.module.css';
import { createOrden } from '../ordenes/services';
import OrdenForm from '../ordenes/components/OrdenForm';

export default function CotizacionesView() {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [filters, setFilters] = useState({ search: '', estado: 'all', page: 0, size: 20 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('info');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCotizacion, setSelectedCotizacion] = useState(null);
    const [ordenModalOpen, setOrdenModalOpen] = useState(false);
    const [cotizacionParaOrden, setCotizacionParaOrden] = useState(null);

    const handleCrearOrden = async (data) => {
        if (!data) { setOrdenModalOpen(false); setCotizacionParaOrden(null); return; }
        setIsLoading(true);
        try {
            await createOrden(data);
            setMessage('Orden creada correctamente');
            setType('success');
            setTitle('Éxito');
            setShowModal(true);
            setOrdenModalOpen(false);
            setCotizacionParaOrden(null);

            // cambia el estado de la cotizacion a aprobada
            try {
                await cambiarEstadoCotizacion(data.cotizacionId, 'APROBADA');

                await fetchCotizaciones();


            } catch (error) {
                console.error(error);
            }
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage(err.message || 'Error al crear la orden');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    const fetchCotizaciones = async () => {
        setIsLoading(true);
        try {
            const params = { page: filters.page, size: filters.size };
            if (filters.search?.trim()) params.busqueda = filters.search.trim();
            if (filters.estado && filters.estado !== 'all') params.estado = filters.estado;

            const data = await getAllCotizaciones(params);
            setCotizaciones(data.contenido || []);
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudieron cargar las cotizaciones');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    useEffect(() => { fetchCotizaciones(); }, [filters]);

    const handleSubmit = async (data) => {
        if (!data) { setIsModalOpen(false); setSelected(null); return; }
        setIsLoading(true);
        try {
            if (selected) {
                await updateCotizacion(selected.id, data);
                setMessage('Cotización actualizada correctamente');
            } else {
                await createCotizacion(data);
                setMessage('Cotización creada correctamente');
            }
            setType('success');
            setTitle('Éxito');
            setShowModal(true);
            setIsModalOpen(false);
            setSelected(null);
            await fetchCotizaciones();
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage(err.message || 'Error al guardar');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!selectedCotizacion) return;
        setIsLoading(true);
        try {
            await deleteCotizacion(selectedCotizacion.id);
            setType('success');
            setTitle('Éxito');
            setMessage('Cotización eliminada correctamente');
            setShowModal(true);
            await fetchCotizaciones();
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudo eliminar la cotización');
            setShowModal(true);
        }
        setConfirmOpen(false);
        setSelectedCotizacion(null);
        setIsLoading(false);
    };

    const handleAprobar = async (item) => {
        setCotizacionParaOrden(item);
        setOrdenModalOpen(true);
    };

    return (
        <>
            {isLoading && <LoadingModal mensaje="Procesando..." />}
            {showModal && <Modal title={title} message={message} type={type} onClose={() => setShowModal(false)} />}
            <ConfirmModal
                isOpen={confirmOpen}
                title="Eliminar cotización"
                message="¿Deseas eliminar esta cotización?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
            <FormModal
                isOpen={isModalOpen}
                title={selected ? 'Editar Cotización' : 'Nueva Cotización'}
                onClose={() => { setIsModalOpen(false); setSelected(null); }}
            >
                <CotizacionForm onSubmit={handleSubmit} initialData={selected} />
            </FormModal>
            <FormModal
                isOpen={ordenModalOpen}
                title="Crear Orden"
                onClose={() => { setOrdenModalOpen(false); setCotizacionParaOrden(null); }}
            >
                {cotizacionParaOrden && (
                    <OrdenForm cotizacion={cotizacionParaOrden} onSubmit={handleCrearOrden} />
                )}
            </FormModal>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Cotizaciones</h1>
                    <p className={styles.subtitle}>Consulta y administra cotizaciones.</p>
                </div>
                <CotizacionFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onNew={() => { setSelected(null); setIsModalOpen(true); }}
                />
                <CotizacionList
                    cotizaciones={cotizaciones}
                    onEdit={(item) => { setSelected(item); setIsModalOpen(true); }}
                    onDelete={(item) => { setSelectedCotizacion(item); setConfirmOpen(true); }}
                    onAprobarOrden={(item) => { handleAprobar(item); }}
                />
            </div>
        </>
    );
}
