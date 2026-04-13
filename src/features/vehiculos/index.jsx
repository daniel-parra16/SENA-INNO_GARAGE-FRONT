import { useEffect, useState } from 'react';
import VehiculoList from './components/VehiculoList';
import VehiculoForm from './components/VehiculoForm';
import VehiculoFilters from './components/VehiculoFilters';
import FormModal from '../../components/ui/Modal/FormModal';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';

import styles from './VehiculosView.module.css';

import {
    getAllVehiculos,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
} from './services';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';
import VehiculoStatCard from './components/VehiculoStatCard';

export default function VehiculosView() {

    const [vehiculos, setVehiculos] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [vehiculoToDelete, setVehiculoToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all'
    });
    // 🔥 NUEVO
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('info');

    // 🔥 FETCH
    const fetchVehiculos = async () => {
        try {
            const data = await getAllVehiculos();
            setVehiculos(data);
        } catch (err) {
            setTitle("Error");
            setType("error");
            setMessage("No se pudieron cargar los vehículos");
            setShowModal(true);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const stats = [
        {
            id: 1,
            title: 'Total Vehículos',
            value: vehiculos.length,
            type: 'total'
        },
        {
            id: 2,
            title: 'Activos',
            value: vehiculos.filter(v => v.activo).length,
            type: 'active'
        },
        {
            id: 3,
            title: 'Inactivos',
            value: vehiculos.filter(v => !v.activo).length,
            type: 'inactive'
        }
    ];

    // 🔥 SUBMIT CON LOADING + MODAL
    const handleSubmit = async (data) => {

        if (!data) return setIsModalOpen(false);

        setIsLoading(true);

        try {
            if (selectedVehiculo) {
                await updateVehiculo(selectedVehiculo.placa, data);
                setMessage("Vehículo actualizado correctamente");
            } else {
                await createVehiculo(data);
                setMessage("Vehículo creado correctamente");
            }

            setTitle("Success");
            setType("success");
            setShowModal(true);

            await fetchVehiculos();

        } catch (err) {

            let errorMessage = err.message || "No se pudo guardar el vehículo";

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

            setTitle("Error");
            setType("error");
            setMessage(errorMessage);
            setShowModal(true);
        }

        setIsModalOpen(false);
        setSelectedVehiculo(null);
        setIsLoading(false);
    };

    const handleConfirmDelete = async () => {

        if (!vehiculoToDelete) return;

        setIsLoading(true);

        try {
            if (vehiculoToDelete.activo) {
                await deleteVehiculo(vehiculoToDelete.placa);

                setMessage("Vehículo desactivado correctamente");
            } else {
                await updateVehiculo(vehiculoToDelete.placa, {
                    ...vehiculoToDelete,
                    activo: true
                });

                setMessage("Vehículo activado correctamente");
            }

            setTitle("Success");
            setType("success");
            setShowModal(true);

            await fetchVehiculos();

        } catch (err) {
            setTitle("Error");
            setType("error");
            setMessage("No se pudo actualizar el estado del vehículo");
            setShowModal(true);
        }

        setConfirmOpen(false);
        setVehiculoToDelete(null);
        setIsLoading(false);
    };

    const handleAskDeleteUser = (user) => {
        setVehiculoToDelete(user);
        setConfirmOpen(true);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setUserToDelete(null);
    };

    const filteredVehiculos = vehiculos.filter(v => {

        // 🔍 BUSCADOR
        const searchMatch =
            v.nombre_completo.toLowerCase().includes(filters.search.toLowerCase()) ||
            v.placa.toLowerCase().includes(filters.search.toLowerCase()) ||
            v.marca.toLowerCase().includes(filters.search.toLowerCase());

        // 🔘 ESTADO
        const statusMatch =
            filters.status === 'all' ||
            (filters.status === 'active' && v.activo) ||
            (filters.status === 'inactive' && !v.activo);

        return searchMatch && statusMatch;
    });

    return (
        <>
            {/* 🔥 LOADING */}
            {isLoading && <LoadingModal mensaje="Procesando..." />}

            {/* 🔥 MODAL MENSAJES */}
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
                title={vehiculoToDelete?.activo ? "Desactivar vehículo" : "Reactivar vehículo"}
                message={
                    vehiculoToDelete?.activo
                        ? `⚠️ Vas a desactivar el vehículo. ¿Deseas continuar?`
                        : `Vas a reactivar el vehículo. ¿Deseas continuar?`
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Gestión de Vehículos</h1>
                    <p className={styles.subtitle}>
                        Administra los vehículos registrados en el sistema
                    </p>
                </div>

                <div className={styles.statsGrid}>
                    {stats && stats.map(stat => (
                        <VehiculoStatCard key={stat.id} {...stat} />
                    ))}
                </div>

                <VehiculoFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onNew={() => {
                        setSelectedVehiculo(null);
                        setIsModalOpen(true);
                    }}
                />

                <VehiculoList
                    vehiculos={filteredVehiculos}
                    onEdit={(vehiculo) => {
                        setSelectedVehiculo(vehiculo);
                        setIsModalOpen(true);
                    }}
                    onToggle={handleAskDeleteUser}
                />

                {isModalOpen && (
                    <FormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={selectedVehiculo ? "Editar Vehículo" : "Nuevo Vehículo"}
                    >
                        <VehiculoForm
                            initialData={selectedVehiculo}
                            onSubmit={handleSubmit}
                        />
                    </FormModal>
                )}
            </div>
        </>
    );
}