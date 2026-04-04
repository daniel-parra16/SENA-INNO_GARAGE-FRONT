import styles from './StatCard.module.css';

export default function StatCard({ title, value, change, changeType, icon }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.iconContainer}>
                    {icon}
                </div>
                <div className={`${styles.badge} ${changeType === 'positive' ? styles.positiveText : styles.negativeText}`}>
                    {change}
                </div>
            </div>
            <div className={styles.footer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.value}>{value}</p>
            </div>
        </div>
    );
}