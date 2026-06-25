import { Clock, Trash2, CheckCircle2, Edit } from 'lucide-react';
import styles from './AgendamientoList.module.css';

export default function AgendamientoList({ agendamientos, onEdit, onDelete, onLlegada }) {
    if (!agendamientos || agendamientos.length === 0) {
        return <div className={styles.emptyMessage}>No hay agendamientos registrados.</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Vehículo</th>
                        <th>Fecha entrada</th>
                        <th>Fecha estimada</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamientos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.usuarioNombres} {item.usuarioApellidos}</td>
                            <td>{item.placaVehiculo} / {item.vehiculoMarca} {item.vehiculoModelo}</td>
                            <td>{new Date(item.fechaEntrada).toLocaleString('es-CO')}</td>
                            <td>{new Date(item.fechaEstimadaSalida).toLocaleString('es-CO')}</td>
                            <td>{item.estado}</td>
                            <td>${Number(item.total || 0).toLocaleString('es-CO')}</td>
                            <td className={styles.actions}>
                                <button className={styles.actionBtn} title="Registrar llegada" onClick={() => onLlegada(item.id)}>
                                    <CheckCircle2 size={16} />
                                </button>
                                <button className={styles.actionBtn} title="Editar" onClick={() => onEdit(item)}>
                                    <Edit size={16} />
                                </button>
                                <button className={styles.actionBtnDanger} title="Eliminar" onClick={() => onDelete(item)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
