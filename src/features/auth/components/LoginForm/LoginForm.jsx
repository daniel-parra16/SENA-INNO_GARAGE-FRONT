import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { loginUser } from '../../services/authService';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      numeroDocumento: username,
      password: password
    }

    loginUser(data);

    // In a real app, you would authenticate here.
    console.log('Login attempt', { username, password });
    // Navigate to dashboard on success
    navigate('/');
  };

  return (
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
        <Link to="/forgotPass" className={styles.forgotPassword} >
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
  );
}
