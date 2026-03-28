import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardView from '../features/dashboard/index';
import OrdenesView from '../features/ordenes/index';
import LoginView from '../features/auth/index';
import RegisterView from '../features/auth/RegisterView';
import RememberView from '../features/auth/RememberView';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/remember" element={<RememberView />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="ordenes" element={<OrdenesView />} />
        {/* Futuras rutas aqui */}
      </Route>
    </Routes>
  );
}