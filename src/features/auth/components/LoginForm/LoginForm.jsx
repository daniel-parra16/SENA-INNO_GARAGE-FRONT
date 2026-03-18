import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate here.
    console.log('Login attempt', { email, password });
    // Navigate to dashboard on success
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input 
          id="email"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="admin@inno.com"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
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
        <label className={styles.checkboxWrapper}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.checkboxLabel}>Remember me</span>
        </label>
        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Sign in
      </button>

      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94A3B8' }}>
        Don't have an account? <Link to="/register" style={{ color: '#1392EC', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
      </div>
    </form>
  );
}
