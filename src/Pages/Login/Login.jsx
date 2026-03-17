import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css';

function Login() {
    const [showPwd, setShowPwd] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles['login-page']}>
            <div className={styles['logo']}>
                <img src="/public/LogoInnoGarageFondoAzul.png" alt="logo" width="10%" />
                <h2>INNO-GARAGE</h2>
            </div>
            <h1 className={styles.title}>Welcome Back</h1>
            <p>Log in to manage your workshop</p>

            <div className={styles['login-card']}>
                <Form className={styles['login-form']} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.field}>
                        <Form.Control className={styles.input} type="text" id="username" placeholder=" " required />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className={styles.field}>
                        <Form.Control
                            className={styles.input}
                            type={showPwd ? 'text' : 'password'}
                            id="password"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <button
                            type="button"
                            className={styles['toggle-pwd']}
                            onClick={() => setShowPwd(s => !s)}
                            aria-label="Mostrar contraseña"
                        >
                            {showPwd ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <a href="/forgot" className={styles['forgot-pwd']}>
                            ¿Forgot your password?
                        </a>
                        <Button
                            variant="primary"
                            className={styles['login-btn']}
                            onClick={() => navigate("/landing")}
                        >
                            Login to Dashboard →
                        </Button>
                    </div>
                </Form>
            </div>

            {/* Texto fuera del card */}
            <p className={styles['register-text']}>
                Don't have an account yet?{' '}
                <span
                    className={styles['register-link']}
                    onClick={() => navigate("/register")}
                >
                    Create an account
                </span>
            </p>
        </div>
    );
}

export default Login;