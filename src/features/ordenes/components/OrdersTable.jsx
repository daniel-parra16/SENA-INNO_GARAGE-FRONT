import { Edit2, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import styles from './OrdersTable.module.css';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Toyota Corolla 2018', technician: 'Carlos Ruiz', servicio: 'Cambio de aceite', status: 'En Progreso', total: '$120.00' },
  { id: 'ORD-002', customer: 'Honda Civic 2020', technician: 'Ana Mendez', servicio: 'Revisión general', status: 'Completado', total: '$450.00' },
  { id: 'ORD-003', customer: 'Ford Ranger 2015', technician: 'Luis Fonsi', servicio: 'Cambio de frenos', status: 'Pendiente', total: '$85.00' },
  { id: 'ORD-004', customer: 'Nissan Sentra 2021', technician: 'Carlos Ruiz', servicio: 'Diagnóstico eléctrico', status: 'Cancelado', total: '$0.00' },
  { id: 'ORD-005', customer: 'Chevrolet Spark 2019', technician: 'Ana Mendez', servicio: 'Cambio de llantas', status: 'Completado', total: '$210.00' },
];

export default function OrdersTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Vehículo / Cliente</th>
            <th>Técnico Asignado</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_ORDERS.map((order) => (
            <tr key={order.id}>
              <td className={styles.idCell}>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.technician}</td>
              <td>{order.servicio}</td>
              <td>
                <StatusBadge status={order.status} />
              </td>
              <td className={styles.totalCell}>{order.total}</td>
              <td>
                <div className={styles.actionButtons}>
                  <button className={styles.actionBtn} title="Ver detalles"><Eye size={16} /></button>
                  <button className={styles.actionBtn} title="Editar"><Edit2 size={16} /></button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Eliminar"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
