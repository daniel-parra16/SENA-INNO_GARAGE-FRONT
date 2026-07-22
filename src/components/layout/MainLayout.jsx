import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import styles from './MainLayout.module.css';

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isLightMode, setIsLightMode] = useState(
        localStorage.getItem('theme') === 'light'
    );

    return (
        <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
                <Sidebar
                    isCollapsed={isCollapsed}
                    isLightMode={isLightMode}
                />
            </aside>

            <div
                className={`${styles.mainWrapper} ${isCollapsed ? styles.mainCollapsed : ""
                    }`}
            >
                <header className={styles.header}>
                    <Header
                        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                        isCollapsed={isCollapsed}
                        isLightMode={isLightMode}
                        setIsLightMode={setIsLightMode}
                    />
                </header>

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
