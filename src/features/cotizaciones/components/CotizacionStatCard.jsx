import { ArrowDownRight, ArrowUpRight, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import styles from './CotizacionStatCard.module.css';

export default function CotizacionStatCard({ title, value, type, trend }) {
  const isPositive = trend >= 0;

  const getIcon = () => {
    switch(type) {
      case 'total': return <FileText size={24} className={styles.iconTotal} />;
      case 'pending': return <Clock size={24} className={styles.iconPending} />;
      case 'approved': return <CheckCircle size={24} className={styles.iconApproved} />;
      case 'rejected': return <XCircle size={24} className={styles.iconRejected} />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.iconWrapper}>
          {getIcon()}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{Math.abs(trend)}% desde el mes pasado</span>
        </div>
      </div>
    </div>
  );
}
