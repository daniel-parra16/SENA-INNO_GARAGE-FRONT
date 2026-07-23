import { useEffect, useState } from "react";
import styles from "./AgendamientoForm.module.css";
import { getUsuariosSimples } from "../../../usuarios/services";
import { getVehiculoByUser } from "../../../vehiculos/services";
import { useAuth } from "../../../../store/authContext";

export default function AgendamientoForm({ onSubmit, initialData = null }) {
    const { user } = useAuth();
    const esCliente = user?.rol === "cliente";

    const [usuarios, setUsuarios] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [formData, setFormData] = useState({
        usuarioId: esCliente ? user.numDoc : initialData?.usuarioId || "",
        placaVehiculo: initialData?.placaVehiculo || "",
        fechaHora: initialData?.fechaHora
            ? initialData.fechaHora.slice(0, 16)
            : "",
        observaciones: initialData?.observaciones || "",
    });
    useEffect(() => {
        if (!esCliente) {
            getUsuariosSimples()
                .then(setUsuarios)
                .catch(() => {});
        }
    }, [esCliente]);

    useEffect(() => {
        const usuarioId = esCliente
            ? user.numDoc
            : initialData?.usuarioId || "";

        setFormData({
            usuarioId,
            placaVehiculo: initialData?.placaVehiculo || "",
            fechaHora: initialData?.fechaHora
                ? initialData.fechaHora.slice(0, 16)
                : "",
            observaciones: initialData?.observaciones || "",
        });

        if (usuarioId) {
            getVehiculoByUser(usuarioId)
                .then(setVehiculos)
                .catch(() => setVehiculos([]));
        } else {
            setVehiculos([]);
        }
    }, [initialData, esCliente, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "usuarioId") {
            setFormData((prev) => ({
                ...prev,
                usuarioId: value,
                placaVehiculo: "",
            }));
            setVehiculos([]);
            if (value) {
                getVehiculoByUser(value)
                    .then(setVehiculos)
                    .catch(() => setVehiculos([]));
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputGroup}>
                {!esCliente && (
                    <div className={styles.field}>
                        <label htmlFor="usuarioId">Cliente</label>
                        <select
                            id="usuarioId"
                            name="usuarioId"
                            value={formData.usuarioId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" hidden>
                                Seleccione un cliente
                            </option>

                            {usuarios.map((u) => (
                                <option
                                    key={u.numeroDocumento}
                                    value={u.numeroDocumento}
                                >
                                    {u.numeroDocumento} - {u.nombreCompleto}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className={styles.field}>
                    <label htmlFor="placaVehiculo">Vehículo</label>
                    <select
                        id="placaVehiculo"
                        name="placaVehiculo"
                        value={formData.placaVehiculo}
                        onChange={handleChange}
                        required
                        disabled={!formData.usuarioId}
                    >
                        <option value="" hidden>
                            {formData.usuarioId
                                ? "Seleccione un vehículo"
                                : "Primero seleccione un cliente"}
                        </option>
                        {vehiculos.length > 0 ? (
                            vehiculos.map((v) => (
                                <option key={v.placa} value={v.placa}>
                                    {v.placa} - {v.marca} {v.modelo}
                                </option>
                            ))
                        ) : formData.usuarioId ? (
                            <option disabled>
                                No hay vehículos para este cliente
                            </option>
                        ) : null}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="fechaHora">Fecha y hora</label>
                    <input
                        type="datetime-local"
                        id="fechaHora"
                        name="fechaHora"
                        value={formData.fechaHora}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={`${styles.field} ${styles.observacionesField}`}>
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        placeholder="Ej: Revisión general del vehículo"
                        value={formData.observaciones}
                        onChange={handleChange}
                        className={styles.textarea}
                    />
                    <small>Las observaciones son opcionales.</small>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => onSubmit(null)}
                >
                    Cancelar
                </button>
                <button type="submit" className={styles.submitBtn}>
                    {initialData
                        ? "Actualizar Agendamiento"
                        : "Crear Agendamiento"}
                </button>
            </div>
        </form>
    );
}
