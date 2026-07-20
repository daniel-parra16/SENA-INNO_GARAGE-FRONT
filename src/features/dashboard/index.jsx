import { useAuth } from '../../store/authContext';

import AdminDashboard from './pages/Admin';
import ClienteDashboard from './pages/Cliente';
import MecanicoDashboard from './pages/Mecanico';

export default function DashboardView() {

  const { user } = useAuth();

  if (!user) {
    return <p>Cargando...</p>;
  }

  switch (user.rol?.toLowerCase()) {

    case 'admin':
      return <AdminDashboard />;

    case 'mecanico':
      return <MecanicoDashboard />;

    case 'cliente':
    default:
      return <ClienteDashboard />;

  }

}