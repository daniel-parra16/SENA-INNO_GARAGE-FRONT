import { Trash2 } from 'lucide-react';
import styles from './CotizacionList.module.css';

const ESTADO_LABELS = {
    PENDIENTE: 'Pendiente',
    APROBADA: 'Aprobada',
    RECHAZADA: 'Rechazada',
    VENCIDA: 'Vencida',
};

const ESTADO_CLASS = {
    PENDIENTE: styles.badgePendiente,
    APROBADA: styles.badgeAprobada,
    RECHAZADA: styles.badgeRechazada,
    VENCIDA: styles.badgeVencida,
};

const formatFecha = (valor) => {
    if (!valor) return '—';
    const d = new Date(valor);
    return isNaN(d) ? '—' : d.toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

export default function CotizacionList({ cotizaciones, onDelete }) {
    if (!cotizaciones || cotizaciones.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p className={styles.emptyText}>No hay cotizaciones disponibles.</p>
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
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Fecha entrada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cotizaciones.map((item) => (
                        <tr key={item.id} className={styles.row}>
                            <td>
                                <span className={styles.clientName}>
                                    {item.usuarioNombres} {item.usuarioApellidos}
                                </span>
                            </td>
                            <td>
                                <span className={styles.plate}>{item.vehiculoPlaca}</span>
                                <span className={styles.vehicleInfo}>{item.vehiculoMarca} {item.vehiculoModelo}</span>
                            </td>
                            <td>
                                <span className={`${styles.badge} ${ESTADO_CLASS[item.estado] ?? ''}`}>
                                    {ESTADO_LABELS[item.estado] ?? item.estado}
                                </span>
                            </td>
                            <td className={styles.total}>${Number(item.total || 0).toLocaleString('es-CO')}</td>
                            <td className={styles.fecha}>{formatFecha(item.fechaEntrada)}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.btnDelete} title="Eliminar" onClick={() => onDelete(item)}>
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}