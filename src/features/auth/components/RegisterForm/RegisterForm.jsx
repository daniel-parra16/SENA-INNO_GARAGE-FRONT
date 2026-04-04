import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import LoadingModal from '../../../../components/ui/LoadingModal/LoadingModal';
import styles from './RegisterForm.module.css';
import Modal from '../../../../components/ui/Modal/modal';

export default function RegisterForm() {

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('info');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setShowModal(true);
      return;
    }

    const { confirmPassword, ...payload } = formData;

    setIsLoading(true);

    try {
      await registerUser(payload);

      setTitle("Success");
      setType("success");
      setMessage("Usuario registrado correctamente. Verifica tu correo.");
      setIsSuccess(true);
      setShowModal(true);
      setIsLoading(false);

    } catch (err) {
      let errorMessage = err.message || "No se pudo registrar el usuario";

      if (err?.errores) {
        const errores = err.errores;

        console.log("errores", errores)
        errorMessage = (
          <ul>
            {Object.entries(errores).map(([campo, mensaje], index) => (
              <li key={index}>
                <strong>▪</strong> {mensaje}
              </li>
            ))}
          </ul>
        );
      }
      setMessage(errorMessage || "No se pudo registrar el usuario");
      setTitle("Error");
      setType("error");
      setIsSuccess(false);
      setShowModal(true);
      setIsLoading(false);

    }
  };

  const handleCloseModal = () => {
    setShowModal(false);

    if (isSuccess) {
      navigate('/verificar-correo', {
        state: { numeroDocumento: formData.numeroDocumento }
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingModal message="Creando tu cuenta..." />}

      {showModal && (
        <Modal
          title={title}
          message={message}
          onClose={handleCloseModal}
          type={type}
        />
      )}

      <form className={styles.formContainer} onSubmit={handleSubmit}>

        <p className={styles.sectionTitle}>Información Personal</p>

        <div className={styles.rowGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="tipoDocumento" className={styles.label}>Tipo de Documento</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              className={styles.input}
              value={formData.tipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden></option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numeroDocumento" className={styles.label}>Número de Documento</label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              className={styles.input}
              placeholder="Ej: 1234567890"
              value={formData.numeroDocumento}
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
            <label htmlFor="telefono" className={styles.label}>Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className={styles.input}
              placeholder="Ej: 3001234567"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="correo" className={styles.label}>Correo Electrónico</label>
            <input
              type="text"
              id="correo"
              name="correo"
              className={styles.input}
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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
                minLength="8"
              />
              <button
                type="button"
                className={styles.togglePwd}
                onClick={() => setShowPwd(s => !s)}
                tabIndex={-1}
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
                minLength="8"
              />
              <button
                type="button"
                className={styles.togglePwd}
                onClick={() => setShowPwd2(s => !s)}
                tabIndex={-1}
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
    </>
  );
}