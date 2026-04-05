import React, { useState } from 'react';
import styles from './InventarioForm.module.css';

export default function InventarioForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    sku: initialData?.sku || '',
    name: initialData?.name || '',
    category: initialData?.category || '',
    stock: initialData?.stock || '',
    price: initialData?.price || '',
    status: initialData?.status || 'En Stock'
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
          <label htmlFor="sku">SKU</label>
          <input 
            type="text" 
            id="sku" 
            name="sku" 
            value={formData.sku} 
            onChange={handleChange} 
            placeholder="Ej: PRD-001"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="name">Nombre del Producto</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ej: Llanta Michelin 15''"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Categoría</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            placeholder="Ej: Repuestos"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="stock">Cantidad en Stock (Unds)</label>
          <input 
            type="number" 
            id="stock" 
            name="stock" 
            value={formData.stock} 
            onChange={handleChange} 
            placeholder="Ej: 45"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Precio Unitario</label>
          <input 
            type="text" 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            placeholder="Ej: $120.00"
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="status">Estado Inicial</label>
          <select 
            id="status" 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="En Stock">En Stock</option>
            <option value="Bajo Stock">Bajo Stock</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}