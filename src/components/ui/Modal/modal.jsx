import styles from './modal.module.css'
export default function Modal({ title, message, onClose, type = "info" }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${styles[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>

        <button className={styles.modalButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}