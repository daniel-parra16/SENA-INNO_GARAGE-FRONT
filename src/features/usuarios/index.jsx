import UserFilters from './components/UserFilters/UserFilters';
import UserList from './components/UserList/UserList';
import UserStatCard from './components/UserStatCard/UserStatCard';
import styles from './UsuariosView.module.css';

export default function UsuariosView() {
  const stats = [
    { id: 1, title: 'Usuarios Totales', value: '45', type: 'total', trend: 12 },
    { id: 2, title: 'Usuarios Activos', value: '42', type: 'active', trend: 5 },
    { id: 3, title: 'Administradores', value: '4', type: 'admin', trend: 0 },
    { id: 4, title: 'Inactivos', value: '3', type: 'inactive', trend: -2 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Usuarios</h1>
        <p className={styles.subtitle}>Administra los accesos y roles del personal del taller</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <UserStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            type={stat.type}
            trend={stat.trend}
          />
        ))}
      </div>

      <UserFilters />
      <UserList />
    </div>
  );
}
