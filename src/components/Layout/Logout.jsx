import React from "react";
import { useNavigate } from 'react-router-dom';
import './Logout';

export default function LogoutModal({ onClose }) {
    const navigate = useNavigate();
    
    return (
        <div className="logout-container">
            <div className="logout-card">
                <h3>¿Cerrar sesión?</h3>
                
                <button onClick={onclose}>Cancelar</button>
                <button onClick={() => navigate("/")}>Salir</button>
            </div>
        </div>
    );
}
