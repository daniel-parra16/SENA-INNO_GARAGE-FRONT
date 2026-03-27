
import { Bell, Moon, Settings } from 'lucide-react';
import { useCallback, useState } from 'react';
import styles from './Header.module.css';
import UserMenu from './UserMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleConfig = useCallback(() => {
    // Aquí puedes navegar a la configuración de cuenta
    alert('Ir a configuración de cuenta');
    setMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    // Aquí deberías llamar a tu función de logout
    alert('Cerrar sesión');
    setMenuOpen(false);
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.rightSection}>
        <button className={styles.iconBtn}>
          <Moon size={20} />
        </button>
        <button className={styles.iconBtn}>
          <Bell size={20} />
        </button>
        <div className={styles.divider}></div>
        <div className={styles.companyName} style={{ position: 'relative' }}>
          <div
            className={styles.userProfile}
            tabIndex={0}
            onClick={handleProfileClick}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <div className={styles.avatar}>
              <div className={styles.avatarPlaceholder}></div>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Alex Thompson</span>
              <span className={styles.userRole}>Shop Manager</span>
            </div>
            <button className={styles.settingsBtn} tabIndex={-1}>
              <Settings size={20} />
            </button>
            <UserMenu
              open={menuOpen}
              onClose={handleCloseMenu}
              onConfig={handleConfig}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}