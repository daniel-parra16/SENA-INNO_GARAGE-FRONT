import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import styles from './MainLayout.module.css';

export default function MainLayout() {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <Header />
                </header>
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}