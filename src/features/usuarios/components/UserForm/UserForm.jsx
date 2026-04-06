import React, { useState } from 'react';
import { User, Wrench, SquareUserRound } from 'lucide-react';
import styles from './UserForm.module.css';

export default function UserForm({ onSubmit, initialData = null }) {
  const [role, setRole] = useState(initialData?.role || 'cliente');
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    tipoDocumento: initialData?.tipoDocumento || '',
    numeroDocumento: initialData?.numeroDocumento || '',
    email: initialData?.email || '',
    telefono: initialData?.telefono || '',
    // Campos de Mecánico
    especialidad: initialData?.especialidad || '',
    certificado: initialData?.certificado || '',
    anioExp: initialData?.anioExp || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, role })
    return;
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

        <button
          type="button"
          className={`${styles.roleCard} ${role === 'admin' ? styles.active : ''}`}
          onClick={() => setRole('admin')}
        >
          <div className={styles.iconWrapper}>
            <SquareUserRound size={18} />
          </div>
          <span className={styles.roleTitle}>Admin</span>
        </button>

      </div>

      <div className={styles.inputGroup}>

        <div className={styles.field}>
          <label htmlFor="tipoDocumento" className={styles.label}>Tipo de Documento</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            className={styles.input}
            value={formData.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="" hidden>Seleccione una opción</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PASAPORTE">Pasaporte</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="numeroDocumento">Número de documento</label>
          <input
            type="text"
            id="numeroDocumento"
            name="numeroDocumento"
            placeholder="Documento de identidad"
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="nombre">Nombres</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej: Juan"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="apellido">Apellidos</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Ej: Pérez"
            value={formData.apellido}
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
            <div className={styles.field}>
              <label htmlFor="anioExp">Años de experiencia</label>
              <input
                type="text"
                id="anioExp"
                name="anioExp"
                placeholder="Ej: 5 años"
                value={formData.anioExp}
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
