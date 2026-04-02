import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginView from '../features/auth/Index';
import RegisterView from '../features/auth/RegisterView';
import RememberView from '../features/auth/RememberView';
import CotizacionesView from '../features/cotizaciones/Index';
import DashboardView from '../features/dashboard/Index';
import InventarioView from '../features/inventario/Index.jsx';
import OrdenesView from '../features/ordenes/Index';
import UsuariosView from '../features/usuarios/Index';
import { useAuth } from '../store/authContext.jsx';
import VerifyEmailView from '../features/auth/VerifyEmailView.jsx';
import NewPasswordView from '../features/auth/NewPasswordView.jsx';

// Permite que solo accedan los usuarios no logueados.
function GuestRoute({ children }) {
  const { user } = useAuth();

  return !user ? children : <Navigate to="/" replace />;
}

// Proteje las rutas en caso que el usuario no se encuentre logueado.
function ProtectedRoute({ children }) {
  // const { user } = useAuth();
  // return user ? children : <Navigate to="/login" replace />;
  return children; // Temporalmente permite el acceso sin autenticación
}

// Proteje las rutas que requieren un rol específico
function RoleRoute({ children, roles }) {
  // const { user } = useAuth();

  // if (!user) return <Navigate to="/login" replace />;

  // if (!roles.includes(user.rol)) {
  //   return <Navigate to="/" replace />;
  //   // Redirige al dashboard si no tiene el rol requerido
  // }

  // Permitir acceso a todas las rutas sin restricción de rol
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <GuestRoute>
          <LoginView />
        </GuestRoute>
      } />

      <Route path="/register" element={
        <GuestRoute>
          <RegisterView />
        </GuestRoute>
      } />

      <Route path="/remember" element={
        <GuestRoute>
          <RememberView />
        </GuestRoute>
      } />

      <Route path="/verificar-correo" element={<VerifyEmailView />} />

      <Route path="/nueva-password" element={<NewPasswordView />} />

      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardView />} />
        <Route path="ordenes" element={<OrdenesView />} />
        <Route path="cotizaciones" element={<CotizacionesView />} />

        {/* Solo admin puede ver usuarios e inventario */}
        <Route path="usuarios" element={
          <RoleRoute roles={["admin"]}>
            <UsuariosView />
          </RoleRoute>
        } />
        <Route path="inventario" element={
          <RoleRoute roles={["admin", "mecanico"]}>
            <InventarioView />
          </RoleRoute>
        } />
      </Route>
    </Routes>
  );
}
