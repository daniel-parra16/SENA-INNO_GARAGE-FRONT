import { Bell, Moon, Sun, ChevronDown, User, Menu, X } from 'lucide-react';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import UserMenu from './UserMenu';
import { useAuth } from '../../../store/authContext';
import { logoutUser } from '../../../features/auth/services/authService';
const rolLabel = {
    admin: 'Administrador',
    mecanico: 'Mecánico',
    cliente: 'Cliente',
};

export default function Header({ toggleSidebar, isCollapsed }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const userProfileRef = useRef(null);

    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light' || document.documentElement.getAttribute('data-theme') === 'light';
    });

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    const toggleTheme = useCallback(() => {
        setIsLightMode((prev) => !prev);
    }, []);

    const handleProfileClick = useCallback(() => {
        setMenuOpen((open) => !open);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleConfig = useCallback(() => {
        // navegar a configuración cuando esté listo
        setMenuOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            // Invalida la sesión en el backend
            await logoutUser(user?.refreshToken);
        } catch {
            // Si el backend falla igual limpiamos el frontend
        } finally {
            logout();
            navigate('/login');
        }
        setMenuOpen(false);
    }, [user, logout, navigate]);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftSection}>
                <button
                    className={styles.toggleBtn}
                    onClick={toggleSidebar}
                    title={isCollapsed ? "Expandir menú" : "Contraer menú"}
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>
            <div className={styles.rightSection}>
                <button className={styles.iconBtn} onClick={toggleTheme}>
                    {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <button className={styles.iconBtn}>
                    <Bell size={20} />
                </button>
                <div className={styles.divider}></div>
                <div className={styles.companyName} style={{ position: 'relative' }}>
                    <div
                        className={styles.userProfile}
                        tabIndex={0}
                        ref={userProfileRef}
                        onClick={handleProfileClick}
                        style={{ cursor: 'pointer', position: 'relative' }}
                    >
                        <div className={`${styles.avatar} ${styles.avatarCircle}`}>
                            <User size={24} color="#fff" />
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user?.nombres}</span>
                            <span className={styles.userRole}>
                                {rolLabel[user?.rol] || user?.rol}
                            </span>
                        </div>
                        <button className={styles.settingsBtn} tabIndex={-1}>
                            <ChevronDown size={20} />
                        </button>
                        <UserMenu
                            open={menuOpen}
                            onClose={handleCloseMenu}
                            onConfig={handleConfig}
                            onLogout={handleLogout}
                            userProfileRef={userProfileRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}