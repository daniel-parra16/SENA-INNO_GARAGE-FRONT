import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import styles from './modal.module.css';

export default function Modal({ isOpen = true, onClose, title, message, type = 'info' }) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className={styles.iconSuccess} size={32} />;
      case 'error':
        return <AlertCircle className={styles.iconError} size={32} />;
      default:
        return <Info className={styles.iconInfo} size={32} />;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            {getIcon()}
            <h3 className={styles.title}>{title}</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.actionButton} onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}