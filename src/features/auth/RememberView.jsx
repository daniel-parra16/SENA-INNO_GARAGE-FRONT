import styles from './RememberView.module.css';
import { RememberForm } from './components/RememberForm';

export default function RememberView() {
    return (
        <div className={styles['forgot-page']}>

            <RememberForm/>

        </div>
    )
}