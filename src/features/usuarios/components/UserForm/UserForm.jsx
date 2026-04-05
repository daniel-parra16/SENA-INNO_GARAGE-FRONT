import React, { useState } from 'react';
import { User, Wrench } from 'lucide-react';
import styles from './UserForm.module.css';

export default function UserForm({ onSubmit, initialData = null }) {
  const [role, setRole] = useState(initialData?.role || 'cliente');
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    identificacion: initialData?.identificacion || '',
    email: initialData?.email || '',
    telefono: initialData?.telefono || '',
    // Campos de Cliente
    placa: initialData?.placa || '',
    modelo: initialData?.modelo || '',
    // Campos de Mecánico
    especialidad: initialData?.especialidad || '',
    certificado: initialData?.certificado || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, role });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.roleSelection}>
        <button
          type="button"
          className={`${styles.roleCard} ${role === 'cliente' ? styles.active : ''}`}
          onClick={() => setRole('cliente')}
        >
          <div className={styles.iconWrapper}>
            <User size={18} />
          </div>
          <span className={styles.roleTitle}>Cliente</span>
        </button>

        <button
          type="button"
          className={`${styles.roleCard} ${role === 'mecanico' ? styles.active : ''}`}
          onClick={() => setRole('mecanico')}
        >
          <div className={styles.iconWrapper}>
            <Wrench size={18} />
          </div>
          <span className={styles.roleTitle}>Mecánico</span>
        </button>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="identificacion">Identificación</label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            placeholder="Documento de identidad"
            value={formData.identificacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Número de contacto"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campos dinámicos según el Rol */}
        {role === 'cliente' && (
          <>
            <div className={styles.field}>
              <label htmlFor="placa">Placa del Vehículo</label>
              <input
                type="text"
                id="placa"
                name="placa"
                placeholder="Ej: ABC-123"
                value={formData.placa}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="modelo">Modelo (Año)</label>
              <input
                type="number"
                id="modelo"
                name="modelo"
                placeholder="Ej: 2023"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {role === 'mecanico' && (
          <>
            <div className={styles.field}>
              <label htmlFor="especialidad">Especialidad</label>
              <select
                id="especialidad"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una especialidad</option>
                <option value="Mecánica General">Mecánica General</option>
                <option value="Electromecánica">Electromecánica</option>
                <option value="Frenos y Suspensión">Frenos y Suspensión</option>
                <option value="Latonería y Pintura">Latonería y Pintura</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="certificado">Certificado Técnico</label>
              <input
                type="text"
                id="certificado"
                name="certificado"
                placeholder="Ej: SENA Electromecánica 12345"
                value={formData.certificado}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={() => onSubmit(null)}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
}
