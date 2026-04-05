import React, { useState } from 'react';
import styles from './CotizacionForm.module.css';

export default function CotizacionForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    cliente: initialData?.cliente || '',
    vehiculo: initialData?.vehiculo || '',
    fecha: initialData?.fecha || new Date().toISOString().split('T')[0],
    total: initialData?.total || '',
    estado: initialData?.estado || 'Pendiente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label htmlFor="cliente">Nombre del Cliente</label>
          <input 
            type="text" 
            id="cliente" 
            name="cliente" 
            value={formData.cliente} 
            onChange={handleChange} 
            placeholder="Ej: Empresas ABC S.A."
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="vehiculo">Vehículo</label>
          <input 
            type="text" 
            id="vehiculo" 
            name="vehiculo" 
            value={formData.vehiculo} 
            onChange={handleChange} 
            placeholder="Ej: 2019 Toyota Hilux"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="fecha">Fecha</label>
          <input 
            type="date" 
            id="fecha" 
            name="fecha" 
            value={formData.fecha} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="total">Costo Total Estimado</label>
          <input 
            type="text" 
            id="total" 
            name="total" 
            value={formData.total} 
            onChange={handleChange} 
            placeholder="Ej: $1,250.00"
            required 
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="estado">Estado Inicial</label>
          <select 
            id="estado" 
            name="estado" 
            value={formData.estado} 
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Rechazada">Rechazada</option>
            <option value="Expirada">Expirada</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Cotización' : 'Crear Cotización'}
        </button>
      </div>
    </form>
  );
}