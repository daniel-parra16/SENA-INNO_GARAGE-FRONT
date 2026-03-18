import styles from './LoginView.module.css';
import LoginForm from './components/LoginForm';

export default function LoginView() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}></div>
      
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logoBox}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#1392EC" />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M24 10.667H12V19.556V28.445H24V37.333H36V28.445V19.556H24V10.667Z" 
                fill="white" 
              />
            </svg>
          </div>
          <h1 className={styles.title}>Sign in to your account</h1>
          <p className={styles.subtitle}>Welcome back! Please enter your details.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
