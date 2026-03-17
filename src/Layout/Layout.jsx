import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";  // ← cambio
import {
    FaHome, FaUsers, FaClipboardList,
    FaTools, FaBoxes, FaUserCircle,
    FaBell, FaMoon, FaSearch
} from "react-icons/fa";
import LogoutModal from "../components/Layout/Logout";

function Layout() {
    const [collapsed, setCollapsed] = useState(true);
    const [logoutModal, setLogoutModal] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { label: "Dashboard",    icon: <FaHome />,          path: "/landing" },
        { label: "Users",        icon: <FaUsers />,         path: "/users" },
        { label: "Cotizaciones", icon: <FaClipboardList />, path: "/cotizaciones" },
        { label: "Ordenes",      icon: <FaTools />,         path: "/ordenes" },
        { label: "Inventario",   icon: <FaBoxes />,         path: "/inventario" },
    ];

    const configItems = [
        { label: "Perfil", icon: <FaUserCircle />, path: "/profile" },
    ];

    return (
        <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>

                <div className={styles['logo-container']}>
                    <img
                        src="/public/LogoInnoGarageFondoAzul.png"
                        alt="logo"
                        className={`${styles['logo-img']} ${collapsed ? styles['collapsed-logo'] : ""}`}
                    />
                    {!collapsed && (
                        <div className={styles['logo-text']}>
                            <span>INNO</span>
                            <span>GARAGE</span>
                        </div>
                    )}
                </div>

                <nav>
                    {!collapsed && (
                        <div className={styles['nav-section-label']}>Menú</div>
                    )}
                    {menuItems.map((item) => (
                        <Link
                            to={item.path}
                            key={item.path}
                            className={`${styles['menu-item']} ${currentPath === item.path ? styles.active : ""}`}
                        >
                            {item.icon}
                            {!collapsed && <span className={styles['menu-label']}>{item.label}</span>}
                        </Link>
                    ))}

                    {!collapsed && (
                        <div className={styles['nav-section-label']}>Configuración</div>
                    )}
                    {configItems.map((item) => (
                        <Link
                            to={item.path}
                            key={item.path}
                            className={`${styles['menu-item']} ${currentPath === item.path ? styles.active : ""}`}
                        >
                            {item.icon}
                            {!collapsed && <span className={styles['menu-label']}>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div
                    className={styles['sidebar-footer']}
                    onClick={() => setLogoutModal(true)}
                >
                    <div className={styles['sidebar-footer-avatar']}>D</div>
                    {!collapsed && (
                        <div className={styles['sidebar-footer-info']}>
                            <span className={styles['sidebar-footer-name']}>Daniel</span>
                            <span className={styles['sidebar-footer-role']}>Administrador</span>
                        </div>
                    )}
                </div>

            </aside>

            <div className={styles['layout-main']}>

                <header className={styles.topbar}>
                    <button className={styles['menu-btn']} onClick={() => setCollapsed(!collapsed)}>
                        ☰
                    </button>

                    <div className={styles['topbar-search']}>
                        <span className={styles['topbar-search-icon']}><FaSearch /></span>
                        <input type="text" placeholder="Buscar citas, facturas o vehículos..." />
                    </div>

                    <div className={styles['topbar-right']}>
                        <div className={styles['topbar-icon-btn']}><FaBell /></div>
                        <div className={styles['topbar-icon-btn']}><FaMoon /></div>
                        <div
                            className={styles.profile}
                            onClick={() => setLogoutModal(true)}
                        >
                            <FaUserCircle size={20} />
                            <span>Daniel</span>
                        </div>
                    </div>
                </header>

                <main className={styles.content}>
                    <Outlet />
                </main>

                {logoutModal && <LogoutModal onclose={() => setLogoutModal(false)} />}
            </div>
        </div>
    );
}

export default Layout;