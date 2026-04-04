import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verificarCorreo } from './services/authService';
import styles from './VerifyEmailView.module.css';
import Modal from '../../components/ui/Modal/modal';

const LONGITUD = 6;

export default function VerifyEmailView() {
    const navigate = useNavigate();
    const location = useLocation();

    const numeroDocumento = location.state?.numeroDocumento;

    const [digitos, setDigitos] = useState(Array(LONGITUD).fill(''));
    const [estado, setEstado] = useState('idle');
    const [mensaje, setMensaje] = useState('');
    const [showModal, setShowModal] = useState(false);
    const inputs = useRef([]);

    if (!numeroDocumento) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconError}>✕❌❎✖</div>
                    <h2 className={styles.titulo}>Enlace invalido</h2>
                    <p className={styles.mensaje}>
                        Accede a esta pagina desde el proceso de registro.
                    </p>
                    <button className={styles.boton} onClick={() => navigate("/register")}>
                        Ir al registro
                    </button >
                </div>
            </div>
        )
    }

    const handleChange = (index, value) => {
        // Solo permite un dígito numérico
        const clean = value.replace(/\D/g, '').slice(-1);

        const nuevos = [...digitos];
        nuevos[index] = clean;
        setDigitos(nuevos);
        setMensaje("");

        if (clean && index < LONGITUD - 1) {
            inputs.current[index + 1]?.focus();
        }

        const codigoCompeto = nuevos.join('');
        if (codigoCompeto.length === LONGITUD && nuevos.every(d => d != '')) {
            verificar(codigoCompeto);
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (digitos[index]) {
                const nuevos = [...digitos];
                nuevos[index] = '';
                setDigitos(nuevos);
            } else if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }

        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) return;
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pegado = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LONGITUD);
        if (!pegado) return;

        const nuevos = Array(LONGITUD).fill('');
        pegado.split('').forEach((char, i) => { nuevos[i] = char; });
        setDigitos(nuevos);

        // Enfocar el último campo llenado
        const lastIndex = Math.min(pegado.length - 1, LONGITUD - 1);
        inputs.current[lastIndex]?.focus();

        if (pegado.length === LONGITUD) {
            verificar(pegado);
        }
    };

    const verificar = async (codigo) => {
        setEstado('cargando');
        setMensaje('');

        try {
            await verificarCorreo(codigo, numeroDocumento);
            // Redirigir al login con mensaje de éxito
            setEstado('exito');
            setShowModal(true);
        } catch (err) {
            setEstado('error');
            setMensaje(err.message || 'Código incorrecto. Intenta de nuevo.');
            // Limpiar campos y volver al primero
            setDigitos(Array(LONGITUD).fill(''));
            inputs.current[0]?.focus();
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    const cargando = estado === 'cargando';

    return (
        <>
            {/* Modal de éxito */}
            {showModal && (
                <Modal
                    title="¡Correo verificado!"
                    message="Tu cuenta ha sido activada correctamente. Ya puedes iniciar sesión."
                    type="success"
                    onClose={handleCloseModal}
                />
            )}
            <div className={styles.container}>
                <div className={styles.card}>

                    <div className={styles.iconCorreo}>📩</div>
                    <h2 className={styles.titulo}>Verifica tu correo</h2>
                    <p className={styles.mensaje}>
                        Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.
                    </p>

                    {/* Campos OTP */}
                    <div className={styles.otpContainer} onPaste={handlePaste}>
                        {digitos.map((digito, index) => (
                            <input
                                key={index}
                                ref={el => inputs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digito}
                                className={`${styles.otpInput} ${mensaje ? styles.otpError : ''} ${cargando ? styles.otpDisabled : ''}`}
                                onChange={e => handleChange(index, e.target.value)}
                                onKeyDown={e => handleKeyDown(index, e)}
                                disabled={cargando}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {/* Error */}
                    {mensaje && (
                        <p className={styles.error}>{mensaje}</p>
                    )}

                    {/* Cargando */}
                    {cargando && (
                        <div className={styles.spinnerRow}>
                            <div className={styles.spinner} />
                            <span>Verificando...</span>
                        </div>
                    )}

                    <p className={styles.hint}>
                        ¿No recibiste el código?{' '}
                        <button
                            className={styles.reenviarBtn}
                            onClick={() => navigate('/register')}
                            disabled={cargando}
                        >
                            Regístrate de nuevo
                        </button>
                    </p>

                </div>
            </div>
        </>

    );
}