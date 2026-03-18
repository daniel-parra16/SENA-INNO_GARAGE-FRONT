import styles from './RegisterView.module.css';
import RegisterForm from './components/RegisterForm/RegisterForm';

export default function RegisterView() {
  return (
    <div className={styles.container}>
      {/* Elementos visuales y de fondo administrados por la vista */}
      <div className={styles.backgroundEffects}></div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logoBox}>
              {/* Puedes reemplazar esto con el tag <img href="/tu-logo.svg" /> */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#1392EC" />
                <path fillRule="evenodd" clipRule="evenodd" d="M24 10.667H12V19.556V28.445H24V37.333H36V28.445V19.556H24V10.667Z" fill="white" />
              </svg>
            </div>
            <h1 className={styles.title}>Crear una cuenta</h1>
            <p className={styles.subtitle}>Introduce tus datos para comenzar.</p>
          </div>
        </div>

        {/* Inyectamos la lógica del componente formulario de registro */}
        <RegisterForm />
      </div>
    </div>
  );
}
