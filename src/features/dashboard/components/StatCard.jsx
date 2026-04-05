import styles from './StatCard.module.css';

export default function StatCard({ title, value, change, changeType, icon }) {
  const isPositive = changeType === 'positive';
  // Parsear el número del trend desde string como '+2%' o '-5%'
  const trendValue = change ? parseFloat(change) : null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.iconContainer}>
          {icon}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.value}>{value}</div>
        {change && (
          <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}