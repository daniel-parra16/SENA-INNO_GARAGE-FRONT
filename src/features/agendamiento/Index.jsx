import { useEffect, useState } from 'react';
import AgendamientoList from './components/AgendamientoList';
import AgendamientoFilters from './components/AgendamientoFilters';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import FormModal from '../../components/ui/Modal/FormModal';
import { getAllAgendamientos, createAgendamiento, updateAgendamiento, changeAgendamientoLlegada, deleteAgendamiento } from './services';
import styles from './AgendamientoView.module.css';

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

    const fetchAgendamientos = async () => {
        setIsLoading(true);
        try {
            const data = await getAllAgendamientos({
                busqueda: filters.search,
                estado: filters.estado !== 'all' ? filters.estado : undefined,
                page: filters.page,
                size: filters.size
            });
            setAgendamientos(data.contenido || []);
        } catch (err) {
            setType('error');
            setTitle('Error');
            setMessage('No se pudieron cargar los agendamientos');
            setShowModal(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAgendamientos();
    }, [filters]);

    const handleSubmit = async (agendamiento) => {
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
            setTitle('Success');
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

    const handleDelete = async () => {
        if (!itemToDelete) return;
        setIsLoading(true);
        try {
            await deleteAgendamiento(itemToDelete.id);
            setMessage('Agendamiento eliminado correctamente');
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

    const handleLlegada = async (id) => {
        setIsLoading(true);
        try {
            await changeAgendamientoLlegada(id);
            setMessage('Llegada registrada correctamente');
            setType('success');
            setTitle('Success');
            setShowModal(true);
            await fetchAgendamientos();
        } catch {
            setType('error');
            setTitle('Error');
            setMessage('No se pudo registrar la llegada');
            setShowModal(true);
        }
        setIsLoading(false);
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
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Agendamientos</h1>
                    <p className={styles.subtitle}>Administra citas y entradas de servicio.</p>
                </div>
                <AgendamientoFilters filters={filters} onFilterChange={setFilters} onNew={() => { setSelected(null); setIsModalOpen(true); }} />
                <AgendamientoList
                    agendamientos={agendamientos}
                    onEdit={(item) => { setSelected(item); setIsModalOpen(true); }}
                    onDelete={(item) => { setItemToDelete(item); setConfirmOpen(true); }}
                    onLlegada={handleLlegada}
                />
            </div>
        </>
    );
}
