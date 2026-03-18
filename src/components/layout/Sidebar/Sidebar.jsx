import {
    Bell,
    Car,
    ClipboardList,
    LayoutGrid,
    Package,
    Settings,
    Users,
    Wrench
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const navItems = [
    { to: '/', icon: <LayoutGrid size={20} />, label: 'Inicio' },
    { to: '/vehiculos', icon: <Car size={20} />, label: 'Vehiculos' },
    { to: '/ordenes', icon: <ClipboardList size={20} />, label: 'Ordenes' },
    { to: '/clientes', icon: <Users size={20} />, label: 'Clientes' },
    { to: '/inventario', icon: <Package size={20} />, label: 'Inventario' },
    { to: '/notificaciones', icon: <Bell size={20} />, label: 'Notificaciones', badge: 3 },
  ];

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <Wrench size={20} color="white" />
        </div>
        <div className={styles.logoText}>
          <span className={styles.brand}>AutoFix Pro</span>
          <span className={styles.subtitle}>Repair Management</span>
        </div>
      </div>

      <nav className={styles.navMenu}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {item.icon}
            <span className={styles.linkLabel}>{item.label}</span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footerSection}>
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
  );
}