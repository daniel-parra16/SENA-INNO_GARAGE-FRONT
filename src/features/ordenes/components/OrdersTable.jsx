import { Edit2, Eye, Trash2 } from 'lucide-react';
import styles from './OrdersTable.module.css';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Toyota Corolla 2018', technician: 'Carlos Ruiz', date: '24 Oct 2024', status: 'En Progreso', total: '$120.00' },
  { id: 'ORD-002', customer: 'Honda Civic 2020', technician: 'Ana Mendez', date: '24 Oct 2024', status: 'Completado', total: '$450.00' },
  { id: 'ORD-003', customer: 'Ford Ranger 2015', technician: 'Luis Fonsi', date: '23 Oct 2024', status: 'Pendiente', total: '$85.00' },
  { id: 'ORD-004', customer: 'Nissan Sentra 2021', technician: 'Carlos Ruiz', date: '23 Oct 2024', status: 'Cancelado', total: '$0.00' },
  { id: 'ORD-005', customer: 'Chevrolet Spark 2019', technician: 'Ana Mendez', date: '22 Oct 2024', status: 'Completado', total: '$210.00' },
];

export default function OrdersTable() {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completado': return styles.statusCompleted;
      case 'En Progreso': return styles.statusProgress;
      case 'Cancelado': return styles.statusCancelled;
      default: return styles.statusPending;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Vehículo / Cliente</th>
            <th>Técnico Asignado</th>
            <th>Fecha</th>
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
              <td>{order.date}</td>
              <td>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
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
