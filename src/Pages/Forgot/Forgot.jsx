import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
        navigate("/");
    };

    return (
        <div className={styles['forgot-page']}>

            {/* Navbar superior */}
            <nav className={styles.navbar}>
                <div className={styles['navbar-brand']}>
                    <img src="/public/LogoInnoGarageFondoAzul.png" alt="logo" width="32px" />
                    INNO-GARAGE
                </div>
                <button
                    className={styles['navbar-close']}
                    onClick={() => navigate("/")}
                    aria-label="Cerrar"
                >
                    ✕
                </button>
            </nav>

            {/* Card principal */}
            <div className={styles['forgot-card']}>

                {/* Banner superior */}
                <div className={styles['card-banner']}>
                    <div className={styles['banner-icon']}>
                        {/* Ícono SVG de llave/engranaje */}
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                            <circle cx="26" cy="26" r="18" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                            {/* Llave */}
                            <g transform="translate(26,26) rotate(-35)">
                                <circle cx="0" cy="-10" r="6" fill="none" stroke="white" strokeWidth="2.5"/>
                                <circle cx="0" cy="-10" r="2.5" fill="white"/>
                                <rect x="-2" y="-5" width="4" height="18" rx="2" fill="white"/>
                                <rect x="-2" y="11" width="4" height="3" rx="1" fill="white"/>
                                <rect x="0" y="12" width="5" height="2.5" rx="1" fill="white"/>
                            </g>
                        </svg>
                    </div>
                    <div className={styles['banner-tag']}>
                        <span>🔒</span> Security Protocol
                    </div>
                </div>

                {/* Cuerpo */}
                <div className={styles['card-body']}>
                    <h2 className={styles['forgot-title']}>Forgot Password</h2>
                    <p className={styles['forgot-subtitle']}>
                        No worries, we'll get you back on the road in no time.
                    </p>
                    <p className={styles['forgot-desc']}>
                        Enter the email address associated with your INNO-GARAGE account.
                        We'll send you a secure link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label className={styles['field-label']}>Email address</label>
                        <div className={styles['input-wrap']}>
                            <span className={styles['input-icon']}>✉</span>
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="usuario@innogarage.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button className={styles['btn-send']} type="submit">
                            Send Reset Link &nbsp;→
                        </button>
                    </form>

                    <div className={styles.divider} />

                    <button
                        className={styles['back-login']}
                        onClick={() => navigate("/")}
                    >
                        ← Return to Login
                    </button>
                </div>
            </div>

            {/* Badges de pie */}
            <div className={styles['footer-badges']}>
                <div className={styles['badge-item']}>
                    <span className={styles['badge-dot']} />
                    Secure Encryption
                </div>
                <div className={styles['badge-item']}>
                    🔒 24/7 Support
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;