// components/UI/LoadingModal/LoadingModal.jsx
import styles from './LoadingModal.module.css';

export default function LoadingModal({ message = 'Cargando...' }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logoWrapper}>
          <img src="/Logo-2.svg" alt="Logo cargando" className={styles.logo} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
