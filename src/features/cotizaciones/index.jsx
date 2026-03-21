import CotizacionesFilters from './components/CotizacionesFilters/CotizacionesFilters';
import CotizacionesTable from './components/CotizacionesTable';
import CotizacionStatCard from './components/CotizacionStatCard';
import styles from './CotizacionesView.module.css';

export default function CotizacionesView() {
  const stats = [
    { id: 1, title: 'Cotizaciones Totales', value: '342', type: 'total', trend: 8 },
    { id: 2, title: 'Pendientes de Aprobación', value: '18', type: 'pending', trend: 5 },
    { id: 3, title: 'Aprobadas', value: '124', type: 'approved', trend: 15 },
    { id: 4, title: 'Rechazadas', value: '12', type: 'rejected', trend: -2 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Cotizaciones</h1>
        <p className={styles.subtitle}>Crea, envía y haz seguimiento de cotizaciones para clientes</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <CotizacionStatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
            type={stat.type}
            trend={stat.trend}
          />
        ))}
      </div>

      <CotizacionesFilters />
      <CotizacionesTable />
    </div>
  );
}
