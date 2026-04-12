import { useAuth } from '../../store/authContext';
import AdminDashboard from './pages/Admin';
import ClienteDashboard from './pages/Cliente';
import MecanicoDashboard from './pages/Mecanico';

export default function DashboardView() {
  const { user } = useAuth();

  if (user?.rol === 'admin') return <AdminDashboard />
  if (user?.rol === 'mecanico') return <MecanicoDashboard />
  return <ClienteDashboard />
}
