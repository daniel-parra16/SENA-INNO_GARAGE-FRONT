import { Package, AlertTriangle, Boxes } from 'lucide-react';
import styles from './InventarioStatCard.module.css';

export default function InventarioStatCard({ title, value, type, onClick }) {

  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle className={styles.iconAlert} size={22} />;
      case 'active': return <Boxes className={styles.iconActive} size={22} />;
      default: return <Package className={styles.iconPackage} size={22} />;
    }
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span>{title}</span>
        {getIcon()}
      </div>

      <div className={styles.value}>{value}</div>
    </div>
  );
}