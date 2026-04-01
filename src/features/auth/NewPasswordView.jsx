import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { restablecerPassword } from './services/authService';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import styles from './NewPasswordView.module.css';

export default function NewPasswordView() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' });

    const token = searchParams.get('token');

    // Si no hay token en la URL no tiene sentido mostrar el formulario
    if (!token) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconError}>✕</div>
                    <h2 className={styles.titulo}>Enlace inválido</h2>
                    <p className={styles.mensaje}>
                        Este enlace no es válido. Solicita uno nuevo desde la pantalla de recuperación.
                    </p>
                    <button className={styles.boton} onClick={() => navigate('/remember')}>
                        Solicitar nuevo enlace
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nuevaPassword !== confirmarPassword) {
            setModalConfig({
                title: 'Error',
                message: 'Las contraseñas no coinciden.',
                type: 'error'
            });
            setShowModal(true);
            return;
        }

        if (nuevaPassword.length < 8) {
            setModalConfig({
                title: 'Error',
                message: 'La contraseña debe tener mínimo 8 caracteres.',
                type: 'error'
            });
            setShowModal(true);
            return;
        }

        setIsLoading(true);

        try {
            await restablecerPassword({
                token,
                nuevaPassword,
                confirmarPassword
            });

            setModalConfig({
                title: 'Contraseña actualizada',
                message: 'Tu contraseña fue cambiada correctamente. Ya puedes iniciar sesión.',
                type: 'success'
            });
            setShowModal(true);
        } catch (err) {
            setModalConfig({
                title: 'Error',
                message: err.message || 'No se pudo actualizar la contraseña.',
                type: 'error'
            });
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalConfig.type === 'success') {
            navigate('/login');
        }
    };

    return (
        <>
            {isLoading && <LoadingModal message="Actualizando contraseña..." />}
            {showModal && (
                <Modal
                    title={modalConfig.title}
                    message={modalConfig.message}
                    type={modalConfig.type}
                    onClose={handleCloseModal}
                />
            )}

            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconLock}>🔐</div>
                    <h2 className={styles.titulo}>Nueva contraseña</h2>
                    <p className={styles.subtitulo}>
                        Crea una contraseña segura para tu cuenta.
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nueva contraseña</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Mínimo 8 caracteres"
                                value={nuevaPassword}
                                onChange={(e) => setNuevaPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Confirmar contraseña</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Repite tu contraseña"
                                value={confirmarPassword}
                                onChange={(e) => setConfirmarPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.boton}
                            disabled={isLoading}
                        >
                            Actualizar contraseña
                        </button>
                    </form>

                    <button
                        className={styles.backBtn}
                        onClick={() => navigate('/login')}
                    >
                        ← Volver al login
                    </button>
                </div>
            </div>
        </>
    );
}