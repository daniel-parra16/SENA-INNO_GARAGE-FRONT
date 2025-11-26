import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./register.css";

function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  return (
    <div className="register-page">
      <div className="register-card">

        {/* TITLE */}
        <h2 className="form-title">Register</h2>

        <Form className="register-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* PERSONAL INFORMATION */}
          <h3 className="section-title">Personal Information</h3>

          <div className="row-group">
            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>Identification</label>
            </div>

            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>Full Name</label>
            </div>

            <div className="field">
              <Form.Control type="email" placeholder=" " required />
              <label>Email Address</label>
            </div>

            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>Phone Number</label>
            </div>
          </div>

          {/* VEHICLE INFORMATION */}
          <h3 className="section-title">Vehicle Information</h3>

          <div className="row-group">
            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>Make</label>
            </div>

            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>Model</label>
            </div>

            <div className="field">
              <Form.Control type="text" placeholder=" " required />
              <label>License Plate</label>
            </div>
          </div>

          {/* SECURITY */}
          <h3 className="section-title">Security</h3>

          <div className="row-group">
            <div className="field password-field">
              <Form.Control
                type={showPwd ? "text" : "password"}
                placeholder=" "
                required
              />
              <label>Password</label>
              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPwd((s) => !s)}
              >
                {showPwd ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="field password-field">
              <Form.Control
                type={showPwd2 ? "text" : "password"}
                placeholder=" "
                required
              />
              <label>Confirm Password</label>
              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPwd2((s) => !s)}
              >
                {showPwd2 ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {/* TERMS */}
          <div className="terms">
            <Form.Check
              type="checkbox"
              id="terms"
              label="Accept Terms and Conditions"
              required
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="button-row">
            <Button variant="warning" type="button" className="btn-back">
              Come Back
            </Button>

            <Button variant="primary" type="submit" className="btn-register">
              Register
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default Register;
