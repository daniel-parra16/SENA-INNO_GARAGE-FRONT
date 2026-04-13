import styles from './VehiculoStatCard.module.css';

export default function VehiculoStatCard({ title, value, type, onClick }) {

    const getTypeClass = () => {
        switch (type) {
            case 'total':
                return styles.total;
            case 'active':
                return styles.active;
            case 'inactive':
                return styles.inactive;
            case 'maintenance':
                return styles.maintenance;
            default:
                return '';
        }
    };

    return (
        <div className={`${styles.card} ${getTypeClass()}`} onClick={onClick}>
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <h2 className={styles.value}>{value}</h2>
            </div>
        </div>
    );
}