// pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { getAdminDashboard } from '../../services';

import styles from './AdminDashboard.module.css';
import { AdminStats } from '../../components/Admin/AdminStats';
import { RecentOrders } from '../../components/Admin/RecentOrders';
import { AlertsPanel } from '../../components/Admin/AlertsPanel';

export default function AdminDashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getAdminDashboard();
            setData(res);
        } catch (error) {
            console.error('Error cargando dashboard', error);
        }
    };

    if (!data) return <p>Cargando dashboard...</p>;

    return (
        <div className={styles.container}>

            <div className={styles.statsGrid}>
                <AdminStats data={data} />
            </div>

            <div className={styles.contentGrid}>
                <RecentOrders />
                <AlertsPanel data={data} />
            </div>

        </div>
    );
}