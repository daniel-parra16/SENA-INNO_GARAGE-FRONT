import { Edit, Trash2, Undo2 } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import styles from './VehiculoList.module.css';

export default function VehiculoList({ vehiculos, onEdit, onToggle }) {

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Color</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehiculos.map((v, index) => (
                            <tr key={index + 1}>
                                <td className={styles.idCell}>{index + 1}</td>

                                <td>{v.placa}</td>
                                <td>{v.marca}</td>
                                <td>{v.modelo}</td>
                                <td>{v.color}</td>

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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}