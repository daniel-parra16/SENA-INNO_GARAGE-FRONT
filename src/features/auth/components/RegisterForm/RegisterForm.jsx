import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    nombres: '',
    apellidos: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }
    // Quitar confirmPassword del payload
    const { confirmPassword, ...payload } = formData;
    try {
      await registerUser(payload);
      navigate('/login');
    } catch (error) {
      alert(error.message || "No se pudo registrar el usuario");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>

      {/* INFORMACIÓN PERSONAL */}
      <p className={styles.sectionTitle}>Información Personal</p>

      <div className={styles.rowGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="documentType" className={styles.label}>Tipo de Documento</label>
          <select
            id="documentType"
            name="documentType"
            className={styles.input}
            value={formData.documentType}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden></option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PP">Pasaporte</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="documentNumber" className={styles.label}>Número de Documento</label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            className={styles.input}
            placeholder="Ej: 1234567890"
            value={formData.documentNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nombres" className={styles.label}>Nombres</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            className={styles.input}
            placeholder="Ej: Juan Andrés"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="apellidos" className={styles.label}>Apellidos</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            className={styles.input}
            placeholder="Ej: Pérez García"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={styles.input}
            placeholder="Ej: 3001234567"
            value={formData.phone}
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
      </div>

      {/* SEGURIDAD */}
      <p className={styles.sectionTitle}>Seguridad</p>

      <div className={styles.rowGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Contraseña</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPwd ? 'text' : 'password'}
              id="password"
              name="password"
              className={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button
              type="button"
              className={styles.togglePwd}
              onClick={() => setShowPwd(s => !s)}
            >
              {showPwd ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirmar Contraseña</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPwd2 ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button
              type="button"
              className={styles.togglePwd}
              onClick={() => setShowPwd2(s => !s)}
            >
              {showPwd2 ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Crear Cuenta →
      </button>

      <div className={styles.footerLink}>
        <span className={styles.footerText}>¿Ya tienes una cuenta? </span>
        <Link to="/login" className={styles.link}>
          Inicia sesión
        </Link>
      </div>

    </form>
  );
}