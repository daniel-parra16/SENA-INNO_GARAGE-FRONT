import React , {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import './Logout.css';

export default function LogoutModal(props) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Permite activar la animación cuando se monta
        setTimeout(() => setShow(true), 10);
    }, []);
    
    return (
        <div className="logout-container" onClick={props.onclose}>
            <div className={`logout-card ${show ? "slide-in" : "slide-out"}`}>
                
                <button className="logout-option" onClick={() => navigate("/profile")}>
                    <FaUserCircle className="icon" />
                    <span>Perfil</span>
                </button>

                <button className="logout-option logout-red" onClick={() => navigate("/")}>
                    <FaSignOutAlt className="icon" />
                    <span>Cerrar sesión</span>
                </button>

            </div>
        </div>
    );
}
