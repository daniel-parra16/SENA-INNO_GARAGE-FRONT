import {
    Bell,
    Car,
    CircleDollarSign,
    ClipboardList,
    LayoutGrid,
    Package,
    Settings,
    UserCog,
    Wrench
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../../store/authContext';

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
    {
        to: '/notificaciones',
        icon: <Bell size={20} />,
        label: 'Notificaciones',
        roles: ['admin', 'mecanico', 'cliente'],
        badge: 3
    },
];

// Mapea el rol interno al nombre visible
const rolLabel = {
    admin: 'Administrador',
    mecanico: 'Mecánico',
    cliente: 'Cliente',
};

export default function Sidebar() {
    const { user } = useAuth();

    // Filtra los items según el rol del usuario
    // const itemsVisibles = navItems.filter(item =>
    //     item.roles.includes(user?.rol)
    // );
    // Mostrando todos los módulos sin filtrar por rol
    const itemsVisibles = navItems;

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.logoSection}>
                <div className={styles.logoIcon}>
                    <Wrench size={20} color="white" />
                </div>
                <div className={styles.logoText}>
                    <span className={styles.brand}>InnoGarage</span>
                    <span className={styles.subtitle}>Repair Management</span>
                </div>
            </div>

            <nav className={styles.navMenu}>
                {itemsVisibles.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        {item.icon}
                        <span className={styles.linkLabel}>{item.label}</span>
                        {item.badge && (
                            <span className={styles.badge}>{item.badge}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className={styles.footerSection}>
                <div className={styles.userProfile}>
                    
                    
                    <button className={styles.settingsBtn}>
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}