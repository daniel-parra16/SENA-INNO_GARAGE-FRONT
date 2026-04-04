import { Activity, AlertTriangle, PackageSearch, XCircle } from 'lucide-react';
import styles from './InventarioStatCard.module.css';

export default function InventarioStatCard({ title, value, type, trend }) {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className={styles.iconWarning} size={24} />;
      case 'critical':
        return <XCircle className={styles.iconCritical} size={24} />;
      case 'value':
        return <Activity className={styles.iconValue} size={24} />;
      default:
        return <PackageSearch className={styles.iconTotal} size={24} />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {getIcon()}
      </div>
      <div className={styles.body}>
        <div className={styles.value}>{value}</div>
        {trend !== undefined && (
          <div className={`${styles.trend} ${trend > 0 ? styles.positive : styles.negative}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </div>
  );
}
