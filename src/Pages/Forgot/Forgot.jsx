import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
        navigate("/login");
    };

    return (
        <div className="forgot-page">
            <div className="forgot-card">

                <h2 className="forgot-title">Recuperar Contraseña</h2>

                <p className="forgot-subtitle">
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className="btn-send" type="submit">
                        Enviar Enlace
                    </button>
                </form>

                <p className="back-login" onClick={() => navigate("/")}>
                    ← Volver al inicio de sesión
                </p>

            </div>
        </div>
    );
};

export default ForgotPassword;
