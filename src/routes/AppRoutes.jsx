import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginView from '../features/auth/Index';
import RegisterView from '../features/auth/RegisterView';
import CotizacionesView from '../features/cotizaciones/Index';
import DashboardView from '../features/dashboard/Index';
import InventarioView from '../features/inventario/Index.jsx';
import OrdenesView from '../features/ordenes/Index';
import UsuariosView from '../features/usuarios/Index';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="ordenes" element={<OrdenesView />} />
        <Route path="cotizaciones" element={<CotizacionesView />} />
        <Route path="usuarios" element={<UsuariosView />} />
        <Route path="inventario" element={<InventarioView />} />
        {/* Futuras rutas aqui */}
      </Route>
    </Routes>
  );
}
