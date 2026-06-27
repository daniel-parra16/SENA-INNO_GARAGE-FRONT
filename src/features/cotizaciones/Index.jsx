import { useEffect, useState } from 'react';
import CotizacionList from './components/CotizacionList';
import CotizacionFilters from './components/CotizacionFilters';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import { getAllCotizaciones, deleteCotizacion } from './services';
import styles from './CotizacionesView.module.css';

export default function CotizacionesView() {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [filters, setFilters] = useState({ search: '', estado: 'all', agendamientoId: '', page: 0, size: 20 });
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('info');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCotizacion, setSelectedCotizacion] = useState(null);

    const fetchCotizaciones = async () => {
        setIsLoading(true);
        try {
            const data = await getAllCotizaciones({
                busqueda: filters.search,
                estado: filters.estado !== 'all' ? filters.estado : undefined,
                agendamientoId: filters.agendamientoId || undefined,
                page: filters.page,
                size: filters.size
            });
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
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Cotizaciones</h1>
                    <p className={styles.subtitle}>Consulta y administra cotizaciones.</p>
                </div>
                <CotizacionFilters filters={filters} onFilterChange={setFilters} />
                <CotizacionList
                    cotizaciones={cotizaciones}
                    onDelete={(item) => { setSelectedCotizacion(item); setConfirmOpen(true); }}
                />
            </div>
        </>
    );
}
