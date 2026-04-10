import { useAuth } from '../../store/authContext';
import AdminDashboard from './pages/Admin';
import ClienteDashboard from './pages/Cliente';
import MecanicoDashboard from './pages/Mecanico';

export default function DashboardView() {
  const { user } = useAuth();
  const stats = [
    {
      id: 1,
      title: 'Vehículos en Taller',
      value: '18',
      change: '+2%',
      changeType: 'positive',
      icon: <Car size={30} className={styles.iconBlue} />
    },
    {
      id: 2,
      title: 'Servicios Pendientes',
      value: '5',
      change: '-5%',
      changeType: 'negative',
      icon: <ClipboardList size={30} className={styles.iconOrange} />
    },
    {
      id: 3,
      title: 'Completados Hoy',
      value: '12',
      change: '+10%',
      changeType: 'positive',
      icon: <CheckCircle size={30} className={styles.iconGreen} />
    },
    {
      id: 4,
      title: 'Resumen de Ingresos',
      value: '$4,250.00',
      change: '+15%',
      changeType: 'positive',
      icon: <Wallet size={30} className={styles.iconPurple} />
    }
  ];

  if (user?.rol === 'admin') return <AdminDashboard />
  if (user?.rol === 'mecanico') return <MecanicoDashboard />
  return <ClienteDashboard />
}
