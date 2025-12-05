import React, { useState } from "react";
import "./Profile.css";
import { FaUser, FaIdCard, FaCar, FaEnvelope, FaPhone, FaEdit, FaSave } from "react-icons/fa";

function Profile() {

    const [editing, setEditing] = useState(false);

    const [data, setData] = useState({
        identification: "1029384756",
        name: "Daniel Guerrero",
        email: "daniel@example.com",
        phone: "3114567890",
        vehicle: "Chevrolet Spark GT"
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEdit = () => setEditing(!editing);

    return (
        <div className="container-modules">
            <h2 className="title">Perfil del Usuario</h2>

            <div className="profile-card">
                
                {/* IDENTIFICACIÓN */}
                <div className="field">
                    <div className="label-row">
                        <FaIdCard className="icon" />
                        <label>Identificación</label>
                    </div>
                    <input type="text" value={data.identification} readOnly />
                </div>

                {/* NOMBRE */}
                <div className="field">
                    <div className="label-row">
                        <FaUser className="icon" />
                        <label>Nombre completo</label>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                {/* VEHÍCULO */}
                <div className="field">
                    <div className="label-row">
                        <FaCar className="icon" />
                        <label>Vehículo</label>
                    </div>
                    <input
                        type="text"
                        name="vehicle"
                        value={data.vehicle}
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                {/* EMAIL */}
                <div className="field">
                    <div className="label-row">
                        <FaEnvelope className="icon" />
                        <label>Correo</label>
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        readOnly={!editing}
                    />
                </div>

                {/* TELÉFONO */}
                <div className="field">
                    <div className="label-row">
                        <FaPhone className="icon" />
                        <label>Teléfono</label>
                    </div>
                    <input
                        type="text"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        readOnly={!editing}
                    />
                </div>
            </div>

            {/* BOTÓN EDITAR/GUARDAR */}
            <div className="button-container">
                <button className="btn-edit" onClick={toggleEdit}>
                    {editing ? (
                        <>
                            <FaSave /> Guardar
                        </>
                    ) : (
                        <>
                            <FaEdit /> Editar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Profile;
