import {
    CheckCircle,
    Clock,
    ShoppingBag,
    XOctagon
} from 'lucide-react';
import styles from './OrderStatCard.module.css';

export default function OrderStatCard({ title, value, type, trend }) {
  const getIcon = () => {
    switch (type) {
      case 'pending': return <Clock className={styles.iconPending} />;
      case 'completed': return <CheckCircle className={styles.iconCompleted} />;
      case 'cancelled': return <XOctagon className={styles.iconCancelled} />;
      default: return <ShoppingBag className={styles.iconTotal} />;
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
        {trend && (
          <div className={`${styles.trend} ${trend > 0 ? styles.positive : styles.negative}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </div>
  );
}
