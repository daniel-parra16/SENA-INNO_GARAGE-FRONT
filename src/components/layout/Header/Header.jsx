import { Bell, Moon, Search } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Buscar cotizacion, cliente o vehiculo..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconBtn}>
          <Moon size={20} />
        </button>
        <button className={styles.iconBtn}>
          <Bell size={20} />
        </button>
        <div className={styles.divider}></div>
        <div className={styles.companyName}>
          AutoFix Workshop S.A.
        </div>
      </div>
    </div>
  );
}