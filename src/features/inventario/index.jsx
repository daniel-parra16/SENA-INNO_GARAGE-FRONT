import InventarioFilters from './components/InventarioFilters';
import InventarioStatCard from './components/InventarioStatCard';
import InventarioTable from './components/InventarioTable';
import styles from './InventarioView.module.css';

export default function InventarioView() {
  const stats = [
    { id: 1, title: 'Total Productos', value: '450', type: 'total', trend: 5 },
    { id: 2, title: 'Bajo Stock', value: '15', type: 'warning', trend: 2 },
    { id: 3, title: 'Agotados', value: '3', type: 'critical', trend: -1 },
    { id: 4, title: 'Valor Inventario', value: '$45,200', type: 'value', trend: 8 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1 className={styles.title}>Inventario</h1>
          <p className={styles.subtitle}>Gestiona tus productos y niveles de stock</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <InventarioStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            type={stat.type}
            trend={stat.trend}
          />
        ))}
      </div>

      <InventarioFilters />
      <div className={styles.tableContainer}>
        <InventarioTable />
      </div>
    </div>
  );
} 
