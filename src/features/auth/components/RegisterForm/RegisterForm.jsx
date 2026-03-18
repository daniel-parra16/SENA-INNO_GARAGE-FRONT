import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }
    
    // Aquí iría la lógica del feature (authService.register(formData))
    console.log("Registrando usuario:", formData);

    // Redirigir al inicio de sesión luego del registro exitoso
    navigate('/login');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="fullName" className={styles.label}>Nombre Completo</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          className={styles.input} 
          placeholder="Ej: Juan Pérez" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className={styles.input} 
          placeholder="ejemplo@correo.com" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          className={styles.input} 
          placeholder="••••••••" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          minLength="6" 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>Confirmar Contraseña</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          className={styles.input} 
          placeholder="••••••••" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
          minLength="6" 
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Crear Cuenta
      </button>

      <div className={styles.footerLink}>
        <span className={styles.footerText}>¿Ya tienes una cuenta? </span>
        {/* Aquí la vista delega su navegación a react-router-dom */}
        <Link to="/login" className={styles.link}>
          Inicia sesión
        </Link>
      </div>
    </form>
  );
}
