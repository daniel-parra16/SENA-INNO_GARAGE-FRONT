import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./App.css";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="landing-header">

      {/* Logo + Marca */}
      <div className="header-left">
        <img 
          src="/public/logo.png" 
          alt="Logo"
          className="header-logo"
        />

        <div className="title-group">
          <span className="title-line1">INNO</span>
          <span className="title-line2">GARAGE</span>
        </div>
      </div>

      {/* Icono Perfil */}
      <div className="header-right">
        <FaUserCircle 
          className="profile-icon"
          onClick={() => navigate("/profile")}
        />
      </div>

    </header>
  );
};

export default LandingHeader;
