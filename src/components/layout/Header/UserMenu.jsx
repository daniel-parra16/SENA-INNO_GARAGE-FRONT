import { useEffect, useRef } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ open, onClose, onConfig, onLogout }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.menu} ref={menuRef}>
      <button className={styles.menuItem} onClick={onConfig}>
        Configurar cuenta
      </button>
      <button className={styles.menuItem} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
