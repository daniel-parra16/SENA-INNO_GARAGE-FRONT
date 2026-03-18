import { Car, CheckCircle, ClipboardList, Wallet } from 'lucide-react';
import AlertsTable from './components/AlertsTable';
import InventoryAlert from './components/InventoryAlert';
import StatCard from './components/StatCard';
import TechnicianList from './components/TechnicianList';
import styles from './Dashboard.module.css';

export default function DashboardView() {
  const stats = [
    { 
      id: 1,
      title: 'Vehicles in Workshop', 
      value: '18', 
      change: '+2%', 
      changeType: 'positive',
      icon: <Car size={20} className={styles.iconBlue} /> 
    },
    { 
      id: 2,
      title: 'Pending Services', 
      value: '5', 
      change: '-5%', 
      changeType: 'negative',
      icon: <ClipboardList size={20} className={styles.iconOrange} /> 
    },
    { 
      id: 3,
      title: 'Completed Today', 
      value: '12', 
      change: '+10%', 
      changeType: 'positive',
      icon: <CheckCircle size={20} className={styles.iconGreen} /> 
    },
    { 
      id: 4,
      title: 'Revenue Summary', 
      value: '$4,250.00', 
      change: '+15%', 
      changeType: 'positive',
      icon: <Wallet size={20} className={styles.iconPurple} /> 
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Workshop Overview</h1>
        <p className={styles.subtitle}>Real-time status of shop operations for Today, Oct 24th.</p>
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