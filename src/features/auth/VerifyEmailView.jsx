import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verificarCorreo } from './services/authService';
import styles from './VerifyEmailView.module.css';

export default function VerifyEmailView() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const executed = useRef(false);

    const [estado, setEstado] = useState('cargando');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (executed.current) return;
        executed.current = true;

        const token = searchParams.get('token');

        if (!token) {
            setEstado('error');
            setMensaje('El enlace de verificación no es válido.');
            return;
        }

        verificarCorreo(token)
            .then(() => {
                setEstado('exito');
            })
            .catch((err) => {
                setEstado('error');
                setMensaje(err.message || 'El enlace es inválido o ha expirado.');
            });

    }, [searchParams, navigate]);

    const irAlLogin = () => navigate('/login');

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {estado === 'cargando' && (
                    <>
                        <div className={styles.spinner}></div>
                        <p className={styles.mensaje}>Verificando tu correo...</p>
                    </>
                )}

                {estado === 'exito' && (
                    <>
                        <div className={styles.iconExito}>✓</div>
                        <h2 className={styles.titulo}>¡Correo verificado!</h2>
                        <p className={styles.mensaje}>
                            Tu cuenta ha sido activada correctamente.
                        </p>
                        <button className={styles.boton} onClick={irAlLogin}>
                            Ir al login
                        </button>
                    </>
                )}

                {estado === 'error' && (
                    <>
                        <div className={styles.iconError}>✕</div>
                        <h2 className={styles.titulo}>Error de verificación</h2>
                        <p className={styles.mensaje}>{mensaje}</p>
                        <button className={styles.boton} onClick={irAlLogin}>
                            Volver al login
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}