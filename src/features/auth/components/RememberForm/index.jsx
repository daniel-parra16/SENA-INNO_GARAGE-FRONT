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

            <div className={styles.formContainer}>

                <div className={styles.content}>

                    <div className={styles.logoBox}>
                        <img src="logo/Logo.png" alt="Fondo Inno Garage" className={styles.imgIG} />
                    </div>

                    <h2>
                        Recuperar contraseña
                    </h2>


                    <p className={styles.description}>
                        Ingresa el correo asociado a tu cuenta.
                        Te enviaremos un enlace para restablecer tu contraseña.
                    </p>



                    <form onSubmit={handleSubmit}>


                        <label className={styles.label}>
                            Correo electrónico
                        </label>


                        <div className={styles.inputWrapper}>


                            <span>
                                ✉
                            </span>


                            <input
                                className={styles.input}
                                type="email"
                                placeholder="usuario@innogarage.com"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />


                        </div>



                        <button
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >

                            Enviar enlace →

                        </button>


                    </form>


                    <button
                        className={styles.backBtn}
                        onClick={() => navigate('/login')}
                    >

                        ← Volver al inicio de sesión

                    </button>



                    <div className={styles.divider} />



                </div>


            </div>



            <div className={styles.securityBox}>

                <div className={styles.securityIcon}>

                </div>
                <div className="securityContent">


                    <div>

                        <h3>
                            Protocolo de seguridad
                        </h3>

                        <p>
                            Protegemos tu cuenta mediante un proceso seguro
                            de recuperación.
                        </p>

                    </div>
                    <div className={styles['footer-badges']}>
                        <div className={styles['badge-item']}>
                            <span className={styles['badge-dot']} />
                            Encriptación segura
                        </div>
                        <div className={styles['badge-item']}>
                            ⛑ Soporte 24/7
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}