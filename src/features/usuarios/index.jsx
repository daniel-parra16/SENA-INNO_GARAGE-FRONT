import { useState } from 'react';
import UserFilters from './components/UserFilters/UserFilters';
import UserList from './components/UserList/UserList';
import UserStatCard from './components/UserStatCard/UserStatCard';
import FormModal from '../../components/ui/Modal/FormModal';
import UserForm from './components/UserForm/UserForm';
import styles from './UsuariosView.module.css';

export default function UsuariosView() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const stats = [
    { id: 1, title: 'Usuarios Totales', value: '45', type: 'total', trend: 12 },
    { id: 2, title: 'Usuarios Activos', value: '42', type: 'active', trend: 5 },
    { id: 3, title: 'Administradores', value: '4', type: 'admin', trend: 0 },
    { id: 4, title: 'Inactivos', value: '3', type: 'inactive', trend: -2 },
  ];

  const handleUserSubmit = (userData) => {
    if (!userData) {
      // Cancelado
      setIsUserModalOpen(false);
      return;
    }
    console.log('Nuevo usuario guardado:', userData);
    setIsUserModalOpen(false);
    // Aquí puedes agregar la lógica para enviar a la API
  };

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

      <UserFilters onOpenNewUser={() => setIsUserModalOpen(true)} />
      <UserList />

      {isUserModalOpen && (
        <FormModal 
          isOpen={isUserModalOpen} 
          onClose={() => setIsUserModalOpen(false)}
          title="Agregar Nuevo Usuario"
        >
          <UserForm onSubmit={handleUserSubmit} />
        </FormModal>
      )}
    </div>
  );
}
