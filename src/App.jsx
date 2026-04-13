import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './store/authContext.jsx';

function SessionExpiredModal() {
  const { sessionExpired, setSessionExpired, logout } = useAuth();
  const navigate = useNavigate();

  if (!sessionExpired) return null;

  const handleAceptar = () => {
    logout();
    setSessionExpired(false);
    navigate("/login");
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        background: "white", borderRadius: "12px",
        padding: "2rem", maxWidth: "400px", width: "90%",
        textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "3rem" }}>⏰</div>
        <h2 style={{ margin: "0.5rem 0" }}>Sesión expirada</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Ha pasado demasiado tiempo sin actividad.
          Por seguridad, debes iniciar sesión nuevamente.
        </p>
        <button
          onClick={handleAceptar}
          style={{
            padding: "0.75rem 2rem",
            background: '#3b82f6', color: "white",
            border: "none", borderRadius: "8px",
            cursor: "pointer", fontSize: "1rem", fontWeight: "bold"
          }}>
          Ir al login
        </button>
      </div>
    </div >
  );
}

function App() {
  return (
    <>
      <SessionExpiredModal />
      <AppRoutes />
    </>
  );
}

export default App;