import React, { useEffect, useState } from 'react';
import { User, Wrench, SquareUserRound } from 'lucide-react';
import styles from './UserForm.module.css';
import { getTipoDoc, getEspecialidadMecanico, getTipoVia } from '../../services';

const ROLE_OPTIONS = [
  { value: 'ROLE_ADMIN', label: 'Admin' },
  { value: 'ROLE_MECANICO', label: 'Mecánico' },
  { value: 'ROLE_CLIENTE', label: 'Cliente' }
];

export default function UserForm({ onSubmit, initialData = null }) {
  const [roles, setRoles] = useState(initialData?.roles || ['ROLE_CLIENTE']);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposVia, setTiposVia] = useState([]);
  const [especialidadesOptions, setEspecialidadesOptions] = useState([]);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || initialData?.nombres || '',
    apellido: initialData?.apellido || initialData?.apellidos || '',
    tipoDocumento: initialData?.tipoDocumento || initialData?.documento?.tipo || '',
    numeroDocumento: initialData?.numeroDocumento || initialData?.documento?.numero || '',
    correo: initialData?.correo || '',
    telefono: initialData?.telefono || '',
    direccion: {
      tipoVia: initialData?.direccion?.tipoVia || '',
      numero: initialData?.direccion?.numero || '',
      numeroSecundario: initialData?.direccion?.numeroSecundario || '',
      numeroTercero: initialData?.direccion?.numeroTercero || '',
      complemento: initialData?.direccion?.complemento || ''
    },
    mecanico: {
      especialidades: initialData?.mecanicoPerfil?.especialidades || initialData?.mecanico?.especialidades || initialData?.especialidades || [],
      aniosExperiencia: initialData?.mecanicoPerfil?.aniosExperiencia || initialData?.mecanico?.aniosExperiencia || initialData?.anioExp || '',
      descripcion: initialData?.mecanicoPerfil?.descripcion || initialData?.mecanico?.descripcion || '',
      disponible: typeof initialData?.mecanicoPerfil?.disponible === 'boolean'
        ? initialData.mecanicoPerfil.disponible
        : typeof initialData?.mecanico?.disponible === 'boolean'
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

  const buildDireccionPayload = (direccion) => {
    const normalizedDireccion = {
      tipoVia: direccion?.tipoVia?.trim() || '',
      numero: direccion?.numero?.trim() || '',
      numeroSecundario: direccion?.numeroSecundario?.trim() || '',
      numeroTercero: direccion?.numeroTercero?.trim() || '',
      complemento: direccion?.complemento?.trim() || ''
    };

    const hasAnyValue = Object.values(normalizedDireccion).some((value) => value);
    return hasAnyValue ? normalizedDireccion : null;
  };

  const buildDireccionCompleta = (direccion) => {
    if (!direccion) return '';
    return [direccion.tipoVia, direccion.numero, direccion.numeroSecundario, direccion.numeroTercero, direccion.complemento]
      .filter(Boolean)
      .join(' ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const direccion = buildDireccionPayload(formData.direccion);
    onSubmit({
      ...formData,
      roles,
      direccion,
      direccionCompleta: direccion ? buildDireccionCompleta(direccion) : ''
    });
  };

  const getTipoDocumento = async () => {
    const data = await getTipoDoc();
    setTiposDocumento(data);
  };

  const getEspecialidadMecanicoOptions = async () => {
    const data = await getEspecialidadMecanico();
    setEspecialidadesOptions(data || []);
  };

  const getTiposViaOptions = async () => {
    const data = await getTipoVia();
    setTiposVia(data || []);
  };

  useEffect(() => {
    getTipoDocumento();
    getTiposViaOptions();
    getEspecialidadMecanicoOptions();
  }, []);

  useEffect(() => {
    setRoles(initialData?.roles || ['ROLE_CLIENTE']);
    setFormData((prev) => ({
      ...prev,
      nombre: initialData?.nombre || initialData?.nombres || '',
      apellido: initialData?.apellido || initialData?.apellidos || '',
      tipoDocumento: initialData?.tipoDocumento || initialData?.documento?.tipo || '',
      numeroDocumento: initialData?.numeroDocumento || initialData?.documento?.numero || '',
      correo: initialData?.correo || '',
      telefono: initialData?.telefono || '',
      direccion: {
        tipoVia: initialData?.direccion?.tipoVia || '',
        numero: initialData?.direccion?.numero || '',
        numeroSecundario: initialData?.direccion?.numeroSecundario || '',
        numeroTercero: initialData?.direccion?.numeroTercero || '',
        complemento: initialData?.direccion?.complemento || ''
      },
      mecanico: {
        especialidades: initialData?.mecanicoPerfil?.especialidades || initialData?.mecanico?.especialidades || initialData?.especialidades || [],
        aniosExperiencia: initialData?.mecanicoPerfil?.aniosExperiencia || initialData?.mecanico?.aniosExperiencia || initialData?.anioExp || '',
        descripcion: initialData?.mecanicoPerfil?.descripcion || initialData?.mecanico?.descripcion || '',
        disponible: typeof initialData?.mecanicoPerfil?.disponible === 'boolean'
          ? initialData.mecanicoPerfil.disponible
          : typeof initialData?.mecanico?.disponible === 'boolean'
            ? initialData.mecanico.disponible
            : true
      }
    }));
  }, [initialData]);

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
          <label htmlFor="direccion.tipoVia">Tipo de vía</label>
          <select
            id="direccion.tipoVia"
            name="direccion.tipoVia"
            className={styles.input}
            value={formData.direccion.tipoVia}
            onChange={handleChange}
          >
            <option value="">Sin especificar</option>
            {tiposVia && tiposVia.length > 0 ? (
              tiposVia.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))
            ) : (
              <option disabled>No hay tipos de vía disponibles</option>
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.numero">Número</label>
          <input
            type="text"
            id="direccion.numero"
            name="direccion.numero"
            placeholder="Ej: 45"
            value={formData.direccion.numero}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.numeroSecundario">Número secundario</label>
          <input
            type="text"
            id="direccion.numeroSecundario"
            name="direccion.numeroSecundario"
            placeholder="Ej: 30"
            value={formData.direccion.numeroSecundario}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.numeroTercero">Número tercero</label>
          <input
            type="text"
            id="direccion.numeroTercero"
            name="direccion.numeroTercero"
            placeholder="Ej: 12"
            value={formData.direccion.numeroTercero}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="direccion.complemento">Complemento</label>
          <input
            type="text"
            id="direccion.complemento"
            name="direccion.complemento"
            placeholder="Ej: Apto 202"
            value={formData.direccion.complemento}
            onChange={handleChange}
          />
        </div>

        <small>La dirección es opcional. Si no diligencias ningún campo, se enviará vacía.</small>

        {isMecanico && (
          <>
            <div className={`${styles.field} ${styles.especialidadesField}`}>
              <label>Especialidades</label>
              <div className={styles.checkboxList}>
                {especialidadesOptions.length > 0 ? (
                  especialidadesOptions.map((especialidad) => {
                    const isChecked = formData.mecanico.especialidades.includes(especialidad.value);
                    return (
                      <label key={especialidad.value} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
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

            <div className={`${styles.field} ${styles.selectedTagsField}`}>
              <label>Especialidades seleccionadas</label>
              <div className={styles.selectedTags}>
                {formData.mecanico.especialidades.length > 0 ? (
                  especialidadesOptions
                    .filter((e) => formData.mecanico.especialidades.includes(e.value))
                    .map((e) => (
                      <span key={e.value} className={styles.tag}>{e.label}</span>
                    ))
                ) : (
                  <span className={styles.noTags}>Ninguna seleccionada</span>
                )}
              </div>
            </div>

            {/* Fila de 3: descripción + años + disponible */}
            <div className={styles.mecanicoBottomRow}>
              <div className={`${styles.field} ${styles.descripcionField}`}>
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
                <label style={{ opacity: 0, pointerEvents: 'none' }}>&nbsp;</label>
                <div className={styles.toggleInner}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      id="mecanico.disponible"
                      name="mecanico.disponible"
                      checked={formData.mecanico.disponible}
                      onChange={handleChange}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                  <label htmlFor="mecanico.disponible" className={styles.toggleLabel}>
                    Disponible
                  </label>
                </div>
              </div>
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
