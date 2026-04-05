import React, { useState } from 'react';
import styles from './OrderForm.module.css';

export default function OrderForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    customer: initialData?.customer || '',
    technician: initialData?.technician || '',
    servicio: initialData?.servicio || '',
    status: initialData?.status || 'Pendiente',
    total: initialData?.total || ''
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
          <label htmlFor="customer">Vehículo / Cliente</label>
          <input 
            type="text" 
            id="customer" 
            name="customer" 
            value={formData.customer} 
            onChange={handleChange} 
            placeholder="Ej: Toyota Corolla 2018"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="technician">Técnico Asignado</label>
          <input 
            type="text" 
            id="technician" 
            name="technician" 
            value={formData.technician} 
            onChange={handleChange} 
            placeholder="Ej: Carlos Ruiz"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="servicio">Servicio a Realizar</label>
          <input 
            type="text" 
            id="servicio" 
            name="servicio" 
            value={formData.servicio} 
            onChange={handleChange} 
            placeholder="Ej: Cambio de aceite"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="total">Costo Total Inicial</label>
          <input 
            type="text" 
            id="total" 
            name="total" 
            value={formData.total} 
            onChange={handleChange} 
            placeholder="Ej: $120.00"
            required 
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="status">Estado Inicial</label>
          <select 
            id="status" 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completado">Completado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Orden' : 'Crear Orden'}
        </button>
      </div>
    </form>
  );
}