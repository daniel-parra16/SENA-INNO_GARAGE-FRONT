import OrderFilters from './components/OrderFilters';
import OrdersTable from './components/OrdersTable';
import OrderStatCard from './components/OrderStatCard';
import styles from './OrdenesView.module.css';

export default function OrdenesView() {
  const stats = [
    { id: 1, title: 'Órdenes Totales', value: '1,284', type: 'total', trend: 12 },
    { id: 2, title: 'En Progreso', value: '42', type: 'pending', trend: -2 },
    { id: 3, title: 'Completadas (Mes)', value: '840', type: 'completed', trend: 8 },
    { id: 4, title: 'Canceladas', value: '12', type: 'cancelled', trend: 0 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Órdenes</h1>
        <p className={styles.subtitle}>Supervisa y administra todas las órdenes de servicio</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <OrderStatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
            type={stat.type}
            trend={stat.trend}
          />
        ))}
      </div>

      <OrderFilters />
      <OrdersTable />
    </div>
  );
}
