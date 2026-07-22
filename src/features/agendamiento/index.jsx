import { useEffect, useState } from 'react';
import AgendamientoList from './components/AgendamientoList';
import AgendamientoFilters from './components/AgendamientoFilters';
import AgendamientoForm from './components/AgendamientoForm';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import FormModal from '../../components/ui/Modal/FormModal';
import { getAllAgendamientos, createAgendamiento, updateAgendamiento, changeAgendamientoLlegada, deleteAgendamiento, changeAgendamientoEstado } from './services';
import { createCotizacion } from '../cotizaciones/services';
import styles from './AgendamientoView.module.css';
import CotizacionForm from '../cotizaciones/components/CotizacionForm';

export default function AgendamientoView() {
    const [agendamientos, setAgendamientos] = useState([]);
    const [filters, setFilters] = useState({ search: '', estado: 'all', page: 0, size: 20 });
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('info');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

    // Estado para el modal de cotización
    const [cotizacionModalOpen, setCotizacionModalOpen] = useState(false);
    const [agendamientoParaCotizar, setAgendamientoParaCotizar] = useState(null);

    const handleNoShow = async (id) => {
        setIsLoading(true);
        try {
            await changeAgendamientoEstado(id, 'NO_SE_PRESENTA');
            setMessage('Registrado como no presentado');
            setType('success');
            setTitle('Éxito');
            setShowModal(true);
            await fetchAgendamientos();
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudo actualizar el estado');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    const fetchAgendamientos = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: filters.page,
                size: filters.size,
            };

            if (debouncedSearch?.trim()) {
                params.busqueda = debouncedSearch.trim();
            }

            if (filters.estado && filters.estado !== 'all') {
                params.estado = filters.estado;
            }

            const data = await getAllAgendamientos(params);
            setAgendamientos(data.contenido || []);
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudieron cargar los agendamientos');
            setShowModal(true);
        }
        setIsLoading(false);
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 400);

        return () => clearTimeout(timer);
    }, [filters.search]);

    useEffect(() => {
        fetchAgendamientos();
    }, [filters.page, filters.size, debouncedSearch, filters.estado]);

    const handleSubmit = async (agendamiento) => {
        if (!agendamiento) { setIsModalOpen(false); setSelected(null); return; }
        setIsLoading(true);
        try {
            if (selected) {
                await updateAgendamiento(selected.id, agendamiento);
                setMessage('Agendamiento actualizado correctamente');
            } else {
                await createAgendamiento(agendamiento);
                setMessage('Agendamiento creado correctamente');
            }
            setType('success');
            setTitle('Éxito');
            setShowModal(true);
            setIsModalOpen(false);
            setSelected(null);
            await fetchAgendamientos();
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage(err.message || 'Error al guardar');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    const handleCotizacionSubmit = async (data) => {
        if (!data) {
            setCotizacionModalOpen(false);
            setAgendamientoParaCotizar(null);
            return;
        }

        setIsLoading(true);

        try {
            await createCotizacion({
                ...data,
                agendamientoId: agendamientoParaCotizar.id
            });

            // Ahora sí cambia el estado
            await changeAgendamientoEstado(
                agendamientoParaCotizar.id,
                'SE_PRESENTA'
            );

            setMessage('Cotización creada correctamente');
            setType('success');
            setTitle('Éxito');
            setShowModal(true);

            setCotizacionModalOpen(false);
            setAgendamientoParaCotizar(null);

            await fetchAgendamientos();
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage(err.message || 'Error al crear la cotización');
            setShowModal(true);
        }

        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        setIsLoading(true);
        try {
            await deleteAgendamiento(itemToDelete.id);
            setMessage('Agendamiento eliminado correctamente');
            setTitle('Éxito');
            setType('success');
            setShowModal(true);
            await fetchAgendamientos();
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudo eliminar el agendamiento');
            setShowModal(true);
        }
        setItemToDelete(null);
        setConfirmOpen(false);
        setIsLoading(false);
    };

    const handleLlegada = async (item) => {
        setAgendamientoParaCotizar(item);
        setCotizacionModalOpen(true);
    };

    return (
        <>
            {isLoading && <LoadingModal mensaje="Procesando..." />}
            {showModal && (
                <Modal title={title} message={message} type={type} onClose={() => setShowModal(false)} />
            )}
            <ConfirmModal
                isOpen={confirmOpen}
                title="Eliminar agendamiento"
                message="¿Deseas eliminar este agendamiento?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
            <FormModal
                isOpen={isModalOpen}
                title={selected ? 'Editar Agendamiento' : 'Nuevo Agendamiento'}
                onClose={() => { setIsModalOpen(false); setSelected(null); }}
            >
                <AgendamientoForm onSubmit={handleSubmit} initialData={selected} />
            </FormModal>

            {/* Modal de cotización desde agendamiento */}
            <FormModal
                isOpen={cotizacionModalOpen}
                title="Nueva Cotización"
                onClose={() => { setCotizacionModalOpen(false); setAgendamientoParaCotizar(null); }}
            >
                <CotizacionForm
                    onSubmit={handleCotizacionSubmit}
                    desdeAgendamiento={true}
                />
            </FormModal>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Agendamientos</h1>
                    <p className={styles.subtitle}>Administra citas y entradas de servicio.</p>
                </div>
                <AgendamientoFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onNew={() => { setSelected(null); setIsModalOpen(true); }}
                />
                <AgendamientoList
                    agendamientos={agendamientos}
                    onEdit={(item) => { setSelected(item); setIsModalOpen(true); }}
                    onDelete={(item) => { setItemToDelete(item); setConfirmOpen(true); }}
                    onLlegada={handleLlegada}
                    onNoShow={handleNoShow}
                    onCotizar={(item) => { setAgendamientoParaCotizar(item); setCotizacionModalOpen(true); }}
                />
            </div>
        </>
    );
}
