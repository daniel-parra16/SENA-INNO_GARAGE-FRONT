import { Trash2 } from 'lucide-react';
import styles from './CotizacionList.module.css';

export default function CotizacionList({ cotizaciones, onDelete }) {
    if (!cotizaciones || cotizaciones.length === 0) {
        return <div className={styles.emptyMessage}>No hay cotizaciones disponibles.</div>;
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
                        <tr key={item.id}>
                            <td>{item.usuarioNombres} {item.usuarioApellidos}</td>
                            <td>{item.vehiculoPlaca} / {item.vehiculoMarca} {item.vehiculoModelo}</td>
                            <td>{item.estado}</td>
                            <td>${Number(item.total || 0).toLocaleString('es-CO')}</td>
                            <td>{new Date(item.fechaEntrada).toLocaleString('es-CO')}</td>
                            <td>
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
