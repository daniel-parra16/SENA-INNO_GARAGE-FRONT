import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

function Login() {
const [showPwd, setShowPwd] = useState(false);
const navigate = useNavigate();

return (
    <div className="login-page">
        <div className="login-card">
            <h2 className="title">Welcome </h2>

            <img src="/public/logo.png" alt="logo" width="30%" />

            <Form className="login-form" onSubmit={(e)=>e.preventDefault()}>
                <div className="field">
                    <Form.Control className="input" type="email" id="email" placeholder=" " required />
                    <label htmlFor="email">E-mail</label>
                </div>

                <div className="field">
                    <Form.Control
                        className="input"
                        type={showPwd ? 'text' : 'password'}
                        id="password"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <button
                        type="button"
                        className="toggle-pwd"
                        onClick={() => setShowPwd(s => !s)}
                        aria-label="Mostrar contraseña"
                    >
                    {showPwd ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>

                <div className="actions">
                    <a href="/forgot" className="forgot-pwd"><h4>¿Forgot you password?</h4></a>
                    <div id="redirects">
                        <Button 
                            variant="primary" 
                            className="redirect-btn login" 
                            onClick={() => navigate("/landing")}
                        >
                            Entry
                        </Button>

                        <Button 
                            variant="primary" 
                            className="redirect-btn register" 
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
);
}

export default Login;