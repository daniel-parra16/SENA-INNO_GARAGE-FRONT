import {
    Car,
    CircleDollarSign,
    ClipboardList,
    LayoutGrid,
    Package,
    Settings,
    UserCog,
    Menu,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../../store/authContext';
import logoInnoGarage from '../../../assets/logo/LogoInnoGarageFondoAzul.png';

// Menú completo — cada item tiene los roles que pueden verlo
const navItems = [
    {
        to: '/',
        icon: <LayoutGrid size={20} />,
        label: 'Inicio',
        roles: ['admin', 'mecanico', 'cliente']
    },
    {
        to: '/usuarios',
        icon: <UserCog size={20} />,
        label: 'Usuarios',
        roles: ['admin']
    },
    {
        to: '/vehiculos',
        icon: <Car size={20} />,
        label: 'Vehículos',
        roles: ['admin', 'mecanico']
    },
    {
        to: '/ordenes',
        icon: <ClipboardList size={20} />,
        label: 'Órdenes',
        roles: ['admin', 'mecanico', 'cliente']
    },
    {
        to: '/cotizaciones',
        icon: <CircleDollarSign size={20} />,
        label: 'Cotizaciones',
        roles: ['admin', 'mecanico', 'cliente']
    },
    {
        to: '/inventario',
        icon: <Package size={20} />,
        label: 'Inventario',
        roles: ['admin', 'mecanico']
    },

];

// Mapea el rol interno al nombre visible
const rolLabel = {
    admin: 'Administrador',
    mecanico: 'Mecánico',
    cliente: 'Cliente',
};

export default function Sidebar({ isCollapsed, toggleSidebar }) {
    const { user } = useAuth();

    // Filtra los items según el rol del usuario
    const itemsVisibles = navItems.filter(item =>
        item.roles.includes(user?.rol)
    );

    return (
        <div className={styles.sidebarContainer}>
            <div className={`${styles.logoSection} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoIcon} style={{ background: 'transparent' }}>
                        <img src={logoInnoGarage} alt="InnoGarage" style={{ width: 45, height: 45, borderRadius: 4 }} />
                    </div>
                    {!isCollapsed && (
                        <div className={styles.logoText}>
                            <span className={styles.brand}>Inno Garage</span>
                            <span className={styles.subtitle}>Administra y Repara</span>
                        </div>
                    )}
                </div>
            </div>

            <nav className={styles.navMenu}>
                {itemsVisibles.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''} ${isCollapsed ? styles.collapsedItem : ''}`
                        }
                        title={isCollapsed ? item.label : undefined}
                    >
                        {item.icon}
                        {!isCollapsed && <span className={styles.linkLabel}>{item.label}</span>}
                        {item.badge && !isCollapsed && (
                            <span className={styles.badge}>{item.badge}</span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <div className={styles.divider}></div>
            <div className={`${styles.footerSection} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.userProfile}>
                    


                    <button className={styles.settingsBtn} title={isCollapsed ? "Configuración" : undefined}>
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}