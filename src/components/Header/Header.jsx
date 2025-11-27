import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import './header.css'

const LandingHeader = () => {
const navigate = useNavigate();

return (
    <header className="landing-header">
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
