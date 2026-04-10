import RememberForm from './components/RememberForm';
import styles from './RememberView.module.css';

export default function RememberView() {
    return (
        <div className={styles['forgot-page']}>

            <RememberForm />

        </div>
    )
}