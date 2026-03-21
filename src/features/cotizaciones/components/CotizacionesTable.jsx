import { Download, Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import styles from './CotizacionesTable.module.css';

export default function CotizacionesTable() {
  const cotizaciones = [
    {
      id: 'COT-2024-001',
      cliente: 'Empresas ABC S.A.',
      vehiculo: '2019 Toyota Hilux',
      fecha: '18 Mar 2026',
      total: '$1,250.00',
      estado: 'Aprobada'
    },
    {
      id: 'COT-2024-002',
      cliente: 'María Rodríguez',
      vehiculo: '2021 Honda Civic',
      fecha: '17 Mar 2026',
      total: '$450.00',
      estado: 'Pendiente'
    },
    {
      id: 'COT-2024-003',
      cliente: 'Transportes Rápidos',
      vehiculo: '2018 Ford Ranger',
      fecha: '16 Mar 2026',
      total: '$2,100.00',
      estado: 'Rechazada'
    },
    {
      id: 'COT-2024-004',
      cliente: 'Carlos Méndez',
      vehiculo: '2020 Nissan CR-V',
      fecha: '15 Mar 2026',
      total: '$85.00',
      estado: 'Expirada'
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>Cotizaciones Recientes</h2>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Cotización</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((cotizacion) => (
              <tr key={cotizacion.id}>
                <td className={styles.idCell}>{cotizacion.id}</td>
                <td>{cotizacion.cliente}</td>
                <td>{cotizacion.vehiculo}</td>
                <td>{cotizacion.fecha}</td>
                <td className={styles.totalCell}>{cotizacion.total}</td>
                <td>
                  <StatusBadge status={cotizacion.estado} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Ver">
                      <Eye size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Editar">
                      <Edit size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Descargar PDF">
                      <Download size={18} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.actionDelete}`} title="Eliminar">
                      <Trash2 size={18} />
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
