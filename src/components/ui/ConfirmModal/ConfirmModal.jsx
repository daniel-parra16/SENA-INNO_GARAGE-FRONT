import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
    isOpen,
    title = "Confirmar acción",
    message = "¿Estás seguro?",
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>

                <div className={styles.actions}>
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}