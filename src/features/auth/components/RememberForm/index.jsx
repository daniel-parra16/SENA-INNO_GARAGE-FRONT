import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './RememberForm.module.css';
import { solicitarRecuperacion } from '../../services/authService';
import LoadingModal from '../../../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../../../components/ui/Modal/modal';

export default function RememberForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await solicitarRecuperacion(email);
            // Siempre mostramos el mismo mensaje — no revelamos si el correo existe
            setModalConfig({
                title: 'Correo enviado',
                message: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
                type: 'success'
            });
            setShowModal(true);
        } catch {
            // Incluso si falla mostramos el mismo mensaje por seguridad
            setModalConfig({
                title: 'Correo enviado',
                message: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
                type: 'success'
            });
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <>
            {isLoading && <LoadingModal message="Enviando enlace..." />}
            {showModal && (
                <Modal
                    title={modalConfig.title}
                    message={modalConfig.message}
                    type={modalConfig.type}
                    onClose={handleCloseModal}
                />
            )}

            <div className={styles['forgot-card']}>
                {/* Banner superior — sin cambios */}
                <div className={styles['card-banner']}>
                    <div className={styles['banner-icon']}>
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                            <circle cx="26" cy="26" r="18" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                            <g transform="translate(26,26) rotate(-35)">
                                <circle cx="0" cy="-10" r="6" fill="none" stroke="white" strokeWidth="2.5" />
                                <circle cx="0" cy="-10" r="2.5" fill="white" />
                                <rect x="-2" y="-5" width="4" height="18" rx="2" fill="white" />
                                <rect x="-2" y="11" width="4" height="3" rx="1" fill="white" />
                                <rect x="0" y="12" width="5" height="2.5" rx="1" fill="white" />
                            </g>
                        </svg>
                    </div>
                    <div className={styles['banner-tag']}>
                        <span>🔒</span> Protocolo de Seguridad
                    </div>
                </div>

                {/* Cuerpo */}
                <div className={styles['card-body']}>
                    <h2 className={styles['forgot-title']}>Recuperar Contraseña</h2>
                    <p className={styles['forgot-subtitle']}>
                        No te preocupes, te ayudaremos a volver en poco tiempo.
                    </p>
                    <p className={styles['forgot-desc']}>
                        Ingresa el correo electrónico asociado a tu cuenta de INNO-GARAGE.
                        Te enviaremos un enlace seguro para restablecer tu contraseña.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label className={styles['field-label']}>Correo electrónico</label>
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
                        <button className={styles['btn-send']} type="submit" disabled={isLoading}>
                            Enviar enlace de recuperación &nbsp;→
                        </button>
                    </form>

                    <div className={styles.divider} />

                    <button
                        className={styles['back-login']}
                        onClick={() => navigate("/login")}
                    >
                        ← Volver al inicio de sesión
                    </button>
                </div>
            </div>

            <div className={styles['footer-badges']}>
                <div className={styles['badge-item']}>
                    <span className={styles['badge-dot']} />
                    Encriptación segura
                </div>
                <div className={styles['badge-item']}>
                    🔒 Soporte 24/7
                </div>
            </div>
        </>
    );
}