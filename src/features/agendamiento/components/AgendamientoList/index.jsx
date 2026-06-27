import { Trash2, CheckCircle2, Edit, UserX } from 'lucide-react';
import styles from './AgendamientoList.module.css';

const ESTADO_LABELS = {
    PENDIENTE: 'Pendiente',
    CONFIRMADO: 'Confirmado',
    SE_PRESENTA: 'Se presenta',
    NO_SE_PRESENTA: 'No se presenta',
    CANCELADO: 'Cancelado',
};

const ESTADO_CLASS = {
    PENDIENTE: styles.badgePendiente,
    CONFIRMADO: styles.badgeConfirmado,
    SE_PRESENTA: styles.badgeSePresenta,
    NO_SE_PRESENTA: styles.badgeNoSePresenta,
    CANCELADO: styles.badgeCancelado,
};

const formatFecha = (valor) => {
    if (!valor) return '—';
    const d = new Date(valor);
    return isNaN(d) ? '—' : d.toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

const puedeRegistrarLlegada = (estado) =>
    estado === 'PENDIENTE' || estado === 'CONFIRMADO';

export default function AgendamientoList({ agendamientos, onEdit, onDelete, onLlegada, onNoShow }) {
    if (!agendamientos || agendamientos.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p className={styles.emptyText}>No hay agendamientos registrados.</p>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Vehículo</th>
                        <th>Fecha agendada</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamientos.map((item) => (
                        <tr key={item.id} className={styles.row}>
                            <td>
                                <span className={styles.clientName}>
                                    {item.usuarioNombres} {item.usuarioApellidos}
                                </span>
                            </td>
                            <td>
                                <span className={styles.plate}>{item.placaVehiculo}</span>
                                <span className={styles.vehicleInfo}>
                                    {item.vehiculoMarca} {item.vehiculoModelo}
                                </span>
                            </td>
                            <td className={styles.fecha}>{formatFecha(item.fechaHora)}</td>
                            <td>
                                <span className={`${styles.badge} ${ESTADO_CLASS[item.estado] ?? ''}`}>
                                    {ESTADO_LABELS[item.estado] ?? item.estado}
                                </span>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    {puedeRegistrarLlegada(item.estado) && (
                                        <>
                                            <button
                                                className={styles.btnCheck}
                                                title="Registrar llegada"
                                                onClick={() => onLlegada(item.id)}
                                            >
                                                <CheckCircle2 size={15} />
                                            </button>

                                            <button
                                                className={styles.btnNoShow}
                                                title="No se presentó"
                                                onClick={() => onNoShow(item.id)}
                                            >
                                                <UserX size={15} />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        className={styles.btnEdit}
                                        title="Editar"
                                        onClick={() => onEdit(item)}
                                    >
                                        <Edit size={15} />
                                    </button>

                                    {item.estado !== 'CANCELADO' && item.estado !== 'NO_SE_PRESENTA' && (
                                        <button
                                            className={styles.btnDelete}
                                            title="Eliminar"
                                            onClick={() => onDelete(item)}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}