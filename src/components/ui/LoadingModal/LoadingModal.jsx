// components/UI/LoadingModal/LoadingModal.jsx
import styles from './LoadingModal.module.css';

export default function LoadingModal({ message = 'Cargando...' }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner}>
          <span /><span /><span />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
