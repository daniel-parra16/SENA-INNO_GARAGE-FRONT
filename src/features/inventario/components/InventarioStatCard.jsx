import { Activity, AlertTriangle, PackageSearch, XCircle } from 'lucide-react';
import styles from './InventarioStatCard.module.css';

const ICONS = {
  total: <PackageSearch size={24} />,
  warning: <AlertTriangle size={24} />,
  critical: <XCircle size={24} />,
  value: <Activity size={24} />
};

export default function InventarioStatCard({ title, value, type, trend }) {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{ICONS[type] || '📊'}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
      <div className={styles.trendContainer}>
        <span className={`${styles.trend} ${isNeutral ? styles.neutral : isPositive ? styles.positive : styles.negative}`}>
          {isNeutral ? '−' : isPositive ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
        <span className={styles.trendText}>vs mes anterior</span>
      </div>
    </div>
  );
}
