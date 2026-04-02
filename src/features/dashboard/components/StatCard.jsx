import styles from './StatCard.module.css';

export default function StatCard({ title, value, change, changeType, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {icon}
      </div>
      <div className={styles.body}>
        <div className={styles.value}>{value}</div>
        {change && (
          <div className={`${styles.trend} ${changeType === 'positive' ? styles.positive : styles.negative}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}