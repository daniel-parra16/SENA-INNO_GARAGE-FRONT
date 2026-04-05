import { useEffect, useRef } from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ open, onClose, onConfig, onLogout, userProfileRef }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      // Si el click NO es ni sobre el menú ni sobre el usuario, cerrá
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        userProfileRef?.current &&
        !userProfileRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, userProfileRef]);

  if (!open) return null;

  return (
    <div className={styles.menu} ref={menuRef}>
      <div className={styles.menuHeader}>
        <span className={styles.menuTitle}>Mi Cuenta</span>
      </div>

      <div className={styles.divider}></div>

      <button className={styles.menuItem}>
        <Bell size={18} />
        <span>Notificaciones</span>
      </button>

      <button className={styles.menuItem} onClick={onConfig}>
        <Settings size={18} />
        <span>Configuración</span>
      </button>

      <div className={styles.divider}></div>

      <button className={`${styles.menuItem} ${styles.dangerItem}`} onClick={onLogout}>
        <LogOut size={18} />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
}
