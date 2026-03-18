import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// Auth
import LoginView from '../features/auth/index';
import RegisterView from '../features/auth/RegisterView';
import ForgotView from '../features/auth/ForgotView';

// Features privadas
import DashboardView from '../features/dashboard/Index';
import OrdenesView from '../features/ordenes/index';
// import InventarioView from '../features/inventario/index';
// import CotizacionesView from '../features/cotizaciones/index';
// import UsuariosView from '../features/usuarios/index';

export default function AppRoutes() {
  return (
    <Routes>

      {/* Ruta raíz → redirige al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas públicas — sin layout */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/forgotPass" element={<ForgotView />} />

      {/* Rutas privadas — con MainLayout y protección */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="ordenes" element={<OrdenesView />} />
        {/* <Route path="inventario" element={<InventarioView />} /> */}
        {/* <Route path="cotizaciones" element={<CotizacionesView />} /> */}
        {/* <Route path="usuarios" element={<UsuariosView />} /> */}
      </Route>

      {/* Ruta no encontrada */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}