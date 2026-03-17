import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Register.module.css";

function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles['register-page']}>

      {/* Header igual al Login */}
      <div className={styles['logo']}>
        <img src="/public/LogoInnoGarageFondoAzul.png" alt="logo" width="5%" />
        <h2>INNO-GARAGE</h2>
      </div>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Fill in your details to get started</p>

      <div className={styles['register-card']}>
        <Form className={styles['register-form']} onSubmit={(e) => e.preventDefault()}>

          {/* PERSONAL INFORMATION */}
          <p className={styles['section-title']}>Personal Information</p>
          <div className={styles['row-group']}>

            <div className={styles.field}>
              <Form.Control as="select" required defaultValue="">
                <option value="" disabled hidden> </option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PP">Pasaporte</option>
              </Form.Control>
              <label>Tipo de Documento</label>
            </div>

            <div className={styles.field}>
              <Form.Control type="text" placeholder=" " required />
              <label>Número de Documento</label>
            </div>

            <div className={styles.field}>
              <Form.Control type="text" placeholder=" " required />
              <label>Nombres</label>
            </div>

            <div className={styles.field}>
              <Form.Control type="text" placeholder=" " required />
              <label>Apellidos</label>
            </div>

            <div className={styles.field}>
              <Form.Control type="tel" placeholder=" " required />
              <label>Teléfono</label>
            </div>

            <div className={styles.field}>
              <Form.Control type="email" placeholder=" " required />
              <label>Correo Electrónico</label>
            </div>

          </div>

          {/* SECURITY */}
          <p className={styles['section-title']}>Security</p>
          <div className={styles['row-group']}>
            <div className={styles.field}>
              <Form.Control
                type={showPwd ? "text" : "password"}
                placeholder=" "
                required
              />
              <label>Password</label>
              <button
                type="button"
                className={styles['toggle-pwd']}
                onClick={() => setShowPwd(s => !s)}
              >
                {showPwd ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className={styles.field}>
              <Form.Control
                type={showPwd2 ? "text" : "password"}
                placeholder=" "
                required
              />
              <label>Confirm Password</label>
              <button
                type="button"
                className={styles['toggle-pwd']}
                onClick={() => setShowPwd2(s => !s)}
              >
                {showPwd2 ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {/* TERMS */}
          <div className={styles.terms}>
            <Form.Check
              type="checkbox"
              id="terms"
              label="Accept Terms and Conditions"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className={styles['button-row']}>
            <Button
              className={styles['btn-register']}
              type="submit"
              onClick={() => navigate("/")}
            >
              Create Account →
            </Button>
            <Button
              className={styles['btn-back']}
              type="button"
              onClick={() => navigate("/")}
            >
              Come Back
            </Button>
          </div>

        </Form>
      </div>

      {/* Link de vuelta al login, fuera del card */}
      <p className={styles['login-text']}>
        Already have an account?{' '}
        <span
          className={styles['login-link']}
          onClick={() => navigate("/")}
        >
          Sign in
        </span>
      </p>

    </div>
  );
}

export default Register;