import { useState, useEffect } from 'react';
import styles from './VehiculoForm.module.css';

export default function VehiculoForm({ initialData, onSubmit }) {
    const [form, setForm] = useState({
        usuario_id: '',
        placa: '',
        marca: '',
        modelo: '',
        anio: '',
        color: '',
        vin: '',
        kilometraje: ''
    });

    // 🔥 Cargar datos cuando es edición
    useEffect(() => {
        if (initialData) {
            setForm({
                usuario_id: initialData.usuario_id || '',
                registrado_por: initialData.registrado_por || '',
                placa: initialData.placa || '',
                marca: initialData.marca || '',
                modelo: initialData.modelo || '',
                anio: initialData.anio || '',
                color: initialData.color || '',
                vin: initialData.vin || '',
                kilometraje: initialData.kilometraje || '',
                activo: initialData.activo ?? true
            });
        }
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
            kilometraje: form.kilometraje || null
        });
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>

            <div className={styles.inputGroup}>

                <div className={styles.field}>
                    <label className={styles.label}>ID Usuario</label>
                    <input
                        className={styles.input}
                        name="usuario_id"
                        value={form.usuario_id}
                        onChange={handleChange}
                        required
                    />
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
                        className={styles.input}
                        name="anio"
                        value={form.anio}
                        onChange={handleChange}
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