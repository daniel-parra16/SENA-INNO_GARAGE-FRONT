// components/UI/LoadingModal/LoadingModal.jsx
import Logo from '../../../../public/Logo-2.svg'; // Ajusta la ruta según tu estructura de carpetas
import styles from './LoadingModal.module.css';

export default function LoadingModal({ message = 'Cargando...' }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logoWrapper}>
          <img src={Logo} alt="Logo cargando" className={styles.logo} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
