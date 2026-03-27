import styles from './LoginView.module.css';
import LoginForm from './components/LoginForm/Index';

export default function LoginView() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}></div>
      
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logoBox}>
            <img src="/src/assets/logo/LogoInnoGarageFondoAzul.png" alt="Fondo Inno Garage" className={styles.imgIG} />
          </div>
          <h1 className={styles.title}>Iniciar sesion</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
