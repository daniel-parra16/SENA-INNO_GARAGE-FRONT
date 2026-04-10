import { useState, useEffect } from 'react';
import styles from './InventarioForm.module.css';

export function InventarioFormModal({ onClose, onSave, initialData }) {

  const [form, setForm] = useState({
    nombre: '',
    referencia: '',
    descripcion: '',
    categoria: '',
    marca: '',
    precio: '',
    stock: '',
    stockMinimo: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        referencia: initialData.referencia || '',
        descripcion: initialData.descripcion || '',
        categoria: initialData.categoria || '',
        marca: initialData.marca || '',
        precio: initialData.precio || '',
        stock: initialData.stock || '',
        stockMinimo: initialData.stockMinimo || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>

      {/* 🔹 GRUPO 1: INFORMACIÓN GENERAL */}
      <div className={styles.inputGroup}>

        <div className={styles.field}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Filtro de aceite"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Referencia</label>
          <input
            type="text"
            name="referencia"
            placeholder="Ej: FIL-ACE-001"
            value={form.referencia}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Marca</label>
          <input
            type="text"
            name="marca"
            placeholder="Ej: Bosch"
            value={form.marca}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Categoría</label>
          <input
            type="text"
            name="categoria"
            placeholder="Ej: Filtros"
            value={form.categoria}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* 🔹 GRUPO 2: STOCK Y PRECIO */}
      <div className={styles.inputGroup}>

        <div className={styles.field}>
          <label className={styles.label}>Precio</label>
          <input
            type="number"
            name="precio"
            placeholder="Ej: 35000"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Cantidad disponible"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Stock mínimo</label>
          <input
            type="number"
            name="stockMinimo"
            placeholder="Mínimo permitido"
            value={form.stockMinimo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>

          <label className={styles.label}>Descripción</label>
          <textarea
            name="descripcion"
            placeholder="Descripción del repuesto..."
            value={form.descripcion}
            onChange={handleChange}
          />

        </div>
      </div>

      {/* 🔹 GRUPO 3: DESCRIPCIÓN */}

      {/* 🔹 ACCIONES */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => onClose()}
        >
          Cancelar
        </button>

        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Repuesto' : 'Crear Repuesto'}
        </button>
      </div>

    </form>
  );
}