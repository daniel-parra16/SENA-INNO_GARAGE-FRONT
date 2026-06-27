import { useEffect, useState } from 'react';
import CotizacionList from './components/CotizacionList';
import CotizacionFilters from './components/CotizacionFilters';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import { getAllCotizaciones, deleteCotizacion } from './services';
import styles from './CotizacionesView.module.css';
import FormModal from '../../components/ui/Modal/FormModal';
import CotizacionForm from './components/CotizacionForm';

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

    const fetchCotizaciones = async () => {
        setIsLoading(true);
        try {
            const params = { page: filters.page, size: filters.size };
            if (filters.search?.trim()) params.busqueda = filters.search.trim();
            if (filters.estado && filters.estado !== 'all') params.estado = filters.estado;
            if (filters.agendamientoId?.trim()) params.agendamientoId = filters.agendamientoId.trim();

            const data = await getAllCotizaciones(params);
            setCotizaciones(data.contenido || []);
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage('No se pudieron cargar las cotizaciones');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCotizaciones();
    }, [filters]);

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
            setTitle('Success');
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
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Cotizaciones</h1>
                    <p className={styles.subtitle}>Consulta y administra cotizaciones.</p>
                </div>
                <CotizacionFilters filters={filters} onFilterChange={setFilters} onNew={() => setIsModalOpen(true)} />
                <CotizacionList
                    cotizaciones={cotizaciones}
                    onEdit={(item) => { setSelected(item); setIsModalOpen(true); }}
                    onDelete={(item) => { setSelectedCotizacion(item); setConfirmOpen(true); }}
                />
            </div>
        </>
    );
}
