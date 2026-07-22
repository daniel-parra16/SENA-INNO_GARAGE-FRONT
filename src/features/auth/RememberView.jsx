import RememberForm from './components/RememberForm';
import styles from './RememberView.module.css';

export default function RememberView() {
    return (
        <div className={styles.container}>

            <div className={styles.backgroundEffects}></div>

            <div className={styles.card}>

                <RememberForm />

            </div>

        </div>
    );
}