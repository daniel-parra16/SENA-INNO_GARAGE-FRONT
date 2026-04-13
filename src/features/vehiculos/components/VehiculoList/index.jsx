import { Edit, Trash2, Undo2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import styles from './VehiculoList.module.css';

const ITEMS_PER_PAGE = 10;

export default function VehiculoList({ vehiculos, onEdit, onToggle }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(vehiculos.length / ITEMS_PER_PAGE));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedVehiculos = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return vehiculos.slice(start, start + ITEMS_PER_PAGE);
    }, [vehiculos, currentPage]);

    const firstItem = vehiculos.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const lastItem = vehiculos.length === 0 ? 0 : Math.min(currentPage * ITEMS_PER_PAGE, vehiculos.length);

    const pageNumbers = useMemo(() => {
        const maxVisible = 5;
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxVisible - 1);
        const normalizedStart = Math.max(1, end - maxVisible + 1);
        const length = end - normalizedStart + 1;

        return Array.from({ length }, (_, index) => normalizedStart + index);
    }, [currentPage, totalPages]);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Propietario</th>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Color</th>
                            <th>Registrado por</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!vehiculos || vehiculos.length === 0 ? (
                            <tr>
                                <td colSpan={9} className={styles.emptyCell}>
                                    No hay vehículos registrados
                                </td>
                            </tr>
                        ) : (
                            paginatedVehiculos.map((v, index) => {
                                const itemIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                                return (
                                    <tr key={v.id ?? v.placa ?? itemIndex}>
                                        <td className={styles.idCell}>{itemIndex}</td>

                                        <td>{v.nombre_completo}</td>
                                        <td>{v.placa}</td>
                                        <td>{v.marca}</td>
                                        <td>{v.modelo}</td>
                                        <td>{v.color}</td>
                                        <td>{v.registrado_por}</td>

                                        <td>
                                            <StatusBadge
                                                status={v.activo ? "Activo" : "Inactivo"}
                                            />
                                        </td>

                                        <td>
                                            <div className={styles.actionButtons}>

                                                {/* EDITAR */}
                                                <button
                                                    className={styles.actionBtn}
                                                    title="Editar"
                                                    onClick={() => onEdit(v)}
                                                >
                                                    <Edit size={18} />
                                                </button>

                                                {/* TOGGLE */}
                                                <button
                                                    className={`${styles.actionBtn} ${v.activo
                                                        ? styles.actionBtnDanger
                                                        : styles.actionBtnSuccess
                                                        }`}
                                                    title={v.activo ? "Desactivar" : "Reactivar"}
                                                    onClick={() => onToggle(v)}
                                                >
                                                    {v.activo
                                                        ? <Trash2 size={18} />
                                                        : <Undo2 size={18} />}
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {vehiculos.length > 0 && (
                <div className={styles.paginationBar}>
                    <p className={styles.paginationInfo}>
                        Mostrando {firstItem}-{lastItem} de {vehiculos.length}
                    </p>

                    <div className={styles.paginationControls}>
                        <button
                            className={styles.paginationBtn}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                        {pageNumbers.map(page => (
                            <button
                                key={page}
                                className={`${styles.paginationBtn} ${currentPage === page ? styles.paginationBtnActive : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className={styles.paginationBtn}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}