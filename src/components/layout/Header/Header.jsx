import { Bell, Moon, Settings } from 'lucide-react';
import { useCallback, useState } from 'react';
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

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
                            <div className={styles.avatarPlaceholder}>
                                {/* Inicial del nombre */}
                                {user?.nombres?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user?.nombres}</span>
                            <span className={styles.userRole}>
                                {rolLabel[user?.rol] || user?.rol}
                            </span>
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