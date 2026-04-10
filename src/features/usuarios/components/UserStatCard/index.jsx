import { Shield, UserCheck, Users, UserX } from 'lucide-react';
import styles from './UserStatCard.module.css';

export default function UserStatCard({ title, value, type, trend }) {
  const getIcon = () => {
    switch (type) {
      case 'active': return <UserCheck className={styles.iconActive} size={24} />;
      case 'inactive': return <UserX className={styles.iconInactive} size={24} />;
      case 'admin': return <Shield className={styles.iconAdmin} size={24} />;
      default: return <Users className={styles.iconTotal} size={24} />;
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