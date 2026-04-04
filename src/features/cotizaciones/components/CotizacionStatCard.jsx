import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import styles from './CotizacionStatCard.module.css';

export default function CotizacionStatCard({ title, value, type, trend }) {
  const getIcon = () => {
    switch (type) {
      case 'pending':
        return <Clock className={styles.iconPending} />;
      case 'approved':
        return <CheckCircle className={styles.iconCompleted} />;
      case 'rejected':
        return <XCircle className={styles.iconCancelled} />;
      default:
        return <FileText className={styles.iconTotal} />;
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
        {typeof trend !== 'undefined' && (
          <div className={`${styles.trend} ${trend > 0 ? styles.positive : styles.negative}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </div>
  );
}
