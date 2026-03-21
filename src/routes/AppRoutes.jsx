import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginView from '../features/auth/index';
import RegisterView from '../features/auth/RegisterView';
import CotizacionesView from '../features/cotizaciones/index';
import DashboardView from '../features/dashboard/index';
import InventarioView from '../features/inventario/index.jsx';
import OrdenesView from '../features/ordenes/index';
import UsuariosView from '../features/usuarios/index';

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
