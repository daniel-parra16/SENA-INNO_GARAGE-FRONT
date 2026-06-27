import { useState, useEffect } from 'react';
import styles from './VehiculoForm.module.css';
import { getUsuariosSimples } from '../../../usuarios/services';

export default function VehiculoForm({ initialData, onSubmit }) {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        numero_documento_propietario: '',
        placa: '',
        marca: '',
        modelo: '',
        anio: '',
        color: '',
        vin: '',
        kilometraje: ''
    });

    const getUsers = async () => {
        const data = await getUsuariosSimples();
        setUsers(data);

    }

    // 🔥 Cargar datos cuando es edición
    useEffect(() => {
        getUsers();
        if (initialData) {
            console.log(initialData);
            setForm({
                numero_documento_propietario: initialData.numero_documento_propietario || '',
                placa: initialData.placa || '',
                marca: initialData.marca || '',
                modelo: initialData.modelo || '',
                anio: initialData.anio || '',
                color: initialData.color || '',
                vin: initialData.vin || '',
                kilometraje: initialData.kilometraje || '',
                activo: initialData.activo ?? true
            });
        };
    }, [initialData]);

    // 🔥 Manejo de cambios
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 🔥 Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            anio: form.anio ? Number(form.anio) : null, // 🔥 aquí conviertes
            kilometraje: form.kilometraje ? Number(form.kilometraje) : null
        });
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>

            <div className={styles.inputGroup}>

                <div className={styles.field}>
                    <label className={styles.label}>Usuario</label>
                    <select
                        id='numero_documento_propietario'
                        name="numero_documento_propietario"
                        className={styles.input}
                        value={form.numero_documento_propietario}
                        onChange={handleChange}
                        required
                    >
                        <option value="" hidden>Seleccione un usuario</option>
                        {users && users.length > 0
                            ? (users.map((user) => (
                                <option key={user.numeroDocumento} value={user.numeroDocumento}>
                                    {user.nombreCompleto}
                                </option>
                            )))
                            : (
                                <option disabled>No hay usuarios registrados</option>
                            )
                        }
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Placa</label>
                    <input
                        className={styles.input}
                        name="placa"
                        value={form.placa}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Marca</label>
                    <input
                        className={styles.input}
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Modelo</label>
                    <input
                        className={styles.input}
                        name="modelo"
                        value={form.modelo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Año</label>
                    <input
                        type='text'
                        className={styles.input}
                        name="anio"
                        value={form.anio}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Solo permite números
                            if (/^\d*$/.test(value)) {
                                setForm(prev => ({
                                    ...prev,
                                    anio: value
                                }));
                            }
                        }}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Color</label>
                    <input
                        className={styles.input}
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>VIN</label>
                    <input
                        className={styles.input}
                        name="vin"
                        value={form.vin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Kilometraje</label>
                    <input
                        className={styles.input}
                        name="kilometraje"
                        value={form.kilometraje}
                        onChange={handleChange}
                    />
                </div>

            </div>

            {/* 🔹 BOTÓN */}
            <div className={styles.actions}>
                <button type="button" className={styles.cancelBtn} onClick={() => onSubmit(null)}>
                    Cancelar
                </button>
                <button type="submit" className={styles.submitBtn}>
                    {initialData ? 'Actualizar Vehículo' : 'Crear Vehículo'}
                </button>
            </div>

        </form>
    );
}