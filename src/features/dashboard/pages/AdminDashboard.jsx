/* import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import styles from './AdminDashboard.module.css';
import { AlertTriangle, Car, ClipboardList, DollarSign } from 'lucide-react';


export default function AdminDashboard() {
    return (
        <div>AdminDashboard</div>
    )
}
 */
import { Car, CheckCircle, ClipboardList, Wallet } from 'lucide-react';
import AlertsTable from '../components/AlertsTable';
import InventoryAlert from '../components/InventoryAlert';
import StatCard from '../components/StatCard';
import TechnicianList from '../components/TechnicianList';
import styles from './AdminDashboard.module.css';

export default function DashboardView() {
    const stats = [
        {
            id: 1,
            title: 'Vehículos en Taller',
            value: '18',
            change: '+2%',
            changeType: 'positive',
            icon: <Car size={24} className={styles.iconBlue} />
        },
        {
            id: 2,
            title: 'Servicios Pendientes',
            value: '5',
            change: '-5%',
            changeType: 'negative',
            icon: <ClipboardList size={24} className={styles.iconOrange} />
        },
        {
            id: 3,
            title: 'Completados Hoy',
            value: '12',
            change: '+10%',
            changeType: 'positive',
            icon: <CheckCircle size={24} className={styles.iconGreen} />
        },
        {
            id: 4,
            title: 'Resumen de Ingresos',
            value: '$4,250.00',
            change: '+15%',
            changeType: 'positive',
            icon: <Wallet size={24} className={styles.iconPurple} />
        }
    ];

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Resumen del Taller</h1>
                <p className={styles.subtitle}>Estado en tiempo real de las operaciones del taller para hoy, 24 de octubre.</p>
            </header>

            <section className={styles.statsGrid}>
                {stats.map(stat => (
                    <StatCard key={stat.id} {...stat} />
                ))}
            </section>

            <section className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    <AlertsTable />
                </div>
                <div className={styles.rightColumn}>
                    <TechnicianList />
                    <InventoryAlert />
                </div>
            </section>
        </div>
    );
}