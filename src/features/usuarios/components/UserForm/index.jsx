import React, { useEffect, useState } from 'react';
import { User, Wrench, SquareUserRound } from 'lucide-react';
import styles from './UserForm.module.css';
import { getTipoDoc, getEspecialidadMecanico } from '../../services';

const ROLE_OPTIONS = [
  { value: 'ROLE_ADMIN', label: 'Admin' },
  { value: 'ROLE_MECANICO', label: 'Mecánico' },
  { value: 'ROLE_CLIENTE', label: 'Cliente' }
];

export default function UserForm({ onSubmit, initialData = null }) {
  const [roles, setRoles] = useState(initialData?.roles || ['ROLE_CLIENTE']);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [especialidadesOptions, setEspecialidadesOptions] = useState([]);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || initialData?.nombres || '',
    apellido: initialData?.apellido || initialData?.apellidos || '',
    tipoDocumento: initialData?.tipoDocumento || '',
    numeroDocumento: initialData?.numeroDocumento || '',
    correo: initialData?.correo || '',
    telefono: initialData?.telefono || '',
    direccion: {
      calle: initialData?.direccion?.calle || '',
      carrera: initialData?.direccion?.carrera || '',
      ciudad: initialData?.direccion?.ciudad || '',
      pais: initialData?.direccion?.pais || ''
    },
    mecanico: {
      especialidades: initialData?.mecanico?.especialidades || initialData?.especialidades || [],
      aniosExperiencia: initialData?.mecanico?.aniosExperiencia || initialData?.anioExp || '',
      descripcion: initialData?.mecanico?.descripcion || '',
      disponible: typeof initialData?.mecanico?.disponible === 'boolean'
        ? initialData.mecanico.disponible
        : true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('direccion.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [key]: value
        }
      }));
      return;
    }

    if (name.startsWith('mecanico.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        mecanico: {
          ...prev.mecanico,
          [key]: type === 'checkbox' ? checked : value
        }
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role) => {
    setRoles((prev) => {
      const isSelected = prev.includes(role);
      if (isSelected) {
        const updated = prev.filter((item) => item !== role);
        return updated.length > 0 ? updated : ['ROLE_CLIENTE'];
      }
      return [...prev, role];
    });
  };

  const handleEspecialidadToggle = (value) => {
    setFormData((prev) => {
      const current = prev.mecanico.especialidades || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        mecanico: {
          ...prev.mecanico,
          especialidades: updated
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, roles });
  };

  const getTipoDocumento = async () => {
    const data = await getTipoDoc();
    setTiposDocumento(data);
  };

  const getEspecialidadMecanicoOptions = async () => {
    const data = await getEspecialidadMecanico();
    setEspecialidadesOptions(data || []);
  };

  useEffect(() => {
    getTipoDocumento();
    getEspecialidadMecanicoOptions();
  }, []);

  const isMecanico = roles.includes('ROLE_MECANICO');

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.roleSelection}>
        {ROLE_OPTIONS.map((option) => {
          const isSelected = roles.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.roleCard} ${isSelected ? styles.active : ''}`}
              onClick={() => handleRoleToggle(option.value)}
            >
              <span className={styles.roleTitle}>{option.label}</span>
            </button>
          );
        })}
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
            {tiposDocumento && tiposDocumento.length > 0 ? (
              tiposDocumento.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))
            ) : (
              <option disabled>No hay tipos de documentos registrados</option>
            )}
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
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="correo@ejemplo.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.calle">Calle</label>
          <input
            type="text"
            id="direccion.calle"
            name="direccion.calle"
            placeholder="Ej: 10"
            value={formData.direccion.calle}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.carrera">Carrera</label>
          <input
            type="text"
            id="direccion.carrera"
            name="direccion.carrera"
            placeholder="Ej: 5"
            value={formData.direccion.carrera}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.ciudad">Ciudad</label>
          <input
            type="text"
            id="direccion.ciudad"
            name="direccion.ciudad"
            placeholder="Ej: Bogotá"
            value={formData.direccion.ciudad}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.pais">País</label>
          <input
            type="text"
            id="direccion.pais"
            name="direccion.pais"
            placeholder="Ej: Colombia"
            value={formData.direccion.pais}
            onChange={handleChange}
            required
          />
        </div>

        {isMecanico && (
          <>
            <div className={styles.field}>
              <label>Especialidades</label>
              <div className={styles.checkboxList}>
                {especialidadesOptions.length > 0 ? (
                  especialidadesOptions.map((especialidad) => {
                    const isChecked = formData.mecanico.especialidades.includes(especialidad.value);
                    return (
                      <label key={especialidad.value} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          name="mecanico.especialidades"
                          value={especialidad.value}
                          checked={isChecked}
                          onChange={() => handleEspecialidadToggle(especialidad.value)}
                        />
                        <span>{especialidad.label}</span>
                      </label>
                    );
                  })
                ) : (
                  <div className={styles.emptyMessage}>No hay especialidades disponibles</div>
                )}
              </div>
              <small>Selecciona una o más especialidades.</small>
            </div>

            <div className={styles.field}>
              <label htmlFor="mecanico.especialidadesResumen">Especialidades seleccionadas</label>
              <input
                id="mecanico.especialidadesResumen"
                type="text"
                readOnly
                className={styles.input}
                value={especialidadesOptions
                  .filter((especialidad) => formData.mecanico.especialidades.includes(especialidad.value))
                  .map((especialidad) => especialidad.label)
                  .join(', ')}
                placeholder="Selecciona las especialidades"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="mecanico.aniosExperiencia">Años de experiencia</label>
              <input
                type="number"
                id="mecanico.aniosExperiencia"
                name="mecanico.aniosExperiencia"
                placeholder="Ej: 3"
                value={formData.mecanico.aniosExperiencia}
                onChange={handleChange}
                min={0}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="mecanico.descripcion">Descripción</label>
              <textarea
                id="mecanico.descripcion"
                name="mecanico.descripcion"
                placeholder="Descripción del mecánico"
                value={formData.mecanico.descripcion}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="mecanico.disponible"
                  name="mecanico.disponible"
                  checked={formData.mecanico.disponible}
                  onChange={handleChange}
                />
                Disponible
              </label>
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
