// components/common/StatCard.jsx
import styles from './StatCard.module.css';

export function StatCard({ title, value, icon, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span>{title}</span>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      <h2>{value}</h2>
    </div>
  );
}