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
              <img src="/src/assets/images/LogoInnoGarageFondoAzul.png" alt="Fondo Inno Garage" className={styles.imgIG} />
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
