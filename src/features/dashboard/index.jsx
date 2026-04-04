import { useAuth } from '../../store/authContext';
import AdminDashboard from './pages/AdminDashboard';
import ClienteDashboard from './pages/ClienteDashboard';
import MecanicoDashboard from './pages/MecanicoDashboard';

export default function DashboardView() {
    const { user } = useAuth();

    if (user?.rol === 'admin') return <AdminDashboard />
    if (user?.rol === 'mecanico') return <MecanicoDashboard />
    return <ClienteDashboard />
}
