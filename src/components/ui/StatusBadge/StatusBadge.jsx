import styles from './StatusBadge.module.css';

/**
 * StatusBadge Component
 * Unifies the visual representation of statuses across the app.
 * @param {string} status - the text to show (e.g., 'Completado', 'Pendiente')
 */
export const StatusBadge = ({ status }) => {
  const getVariant = (statusName) => {
    switch (statusName?.toLowerCase()) {
      case 'completado':
      case 'aprobada':
      case 'activo':
      case 'en stock':
        return styles.success;
      case 'en progreso':
      case 'info':
        return styles.info;
      case 'pendiente':
      case 'bajo stock':
        return styles.warning;
      case 'cancelado':
      case 'rechazada':
      case 'inactivo':
      case 'agotado':
        return styles.error;
      case 'expirada':
        return styles.neutral;
      default:
        return styles.warning; // Defaulting to yellow/pending behavior from orders
    }
  };

  return (
    <span className={`${styles.badge} ${getVariant(status)}`}>
      {status}
    </span>
  );
};
