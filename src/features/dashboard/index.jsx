import { useAuth } from '../../store/authContext';
import AdminDashboard from './components/AdminDashboard';
import ClienteDashboard from './components/ClienteDashboard';
import MecanicoDashboard from './components/MecanicoDashboard';

export default function DashboardView() {
    const { user } = useAuth();

    if (user?.rol === 'admin') return <AdminDashboard />
    if (user?.rol === 'mecanico') return <MecanicoDashboard />
    return <ClienteDashboard />
}
