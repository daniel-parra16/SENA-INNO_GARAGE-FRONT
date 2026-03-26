import { Bell, Moon, Settings } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
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
        <div className={styles.companyName}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <div className={styles.avatarPlaceholder}></div>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Alex Thompson</span>
              <span className={styles.userRole}>Shop Manager</span>
            </div>
            <button className={styles.settingsBtn}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}