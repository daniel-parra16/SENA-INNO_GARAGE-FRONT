import { Info } from 'lucide-react';
import styles from './InventoryAlert.module.css';

export default function InventoryAlert() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Info color="var(--info-color)" size={20} />
                <h3 className={styles.title}>Inventory Low</h3>
            </div>
            <p className={styles.description}>
                Oil filters (OEM-88) and Synthetic 5W-30 stock is below threshold. Review orders.
            </p>
            <button className={styles.actionBtn}>
                RESTOCK NOW
            </button>
        </div>
    );
}