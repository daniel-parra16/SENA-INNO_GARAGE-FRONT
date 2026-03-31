import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { loginUser } from '../../services/authService';
import LoadingModal from '../../../../components/ui/LoadingModal/LoadingModal';
import { useAuth } from '../../../../store/authContext';
import Modal from '../../../../components/ui/Modal/modal';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    setIsLoading(true);
    
    try {
      const data = await loginUser({ numeroDocumento: username, password: password });
      login(data);         // guarda tokens + usuario en contexto y localStorage
      navigate('/');
    } catch (err) {
      setTitle("Error");
      setError(err.message || 'Credenciales incorrectas');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal de carga — se renderiza encima de todo mientras isLoading sea true */}
      {isLoading && <LoadingModal message="Validando Credenciales..." />}

      {/* Modal que muestra el error en pantalla */}
      {showModal && <Modal title={title} message={error} onClose={() => setShowModal(false)}/>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Usuario
          </label>
          <input 
            id="username"
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="Username"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.checkboxContainer}>
          <Link to="/remember" className={styles.forgotPassword}>
            Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Iniciar sesion
        </button>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94A3B8' }}>
          No tienes una cuenta? <Link to="/register" style={{ color: '#1392EC', textDecoration: 'none', fontWeight: 500 }}>Registrate</Link>
        </div>
      </form>
    </>
  );
}
