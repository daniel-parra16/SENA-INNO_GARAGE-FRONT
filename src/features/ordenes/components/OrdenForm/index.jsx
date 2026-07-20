import { useEffect, useState } from 'react';
import styles from './OrdenForm.module.css';
import { getMecanicosSimples } from '../../../usuarios/services';

export default function OrdenForm({ cotizacion, onSubmit }) {
  const [mecanicos, setMecanicos] = useState([]);
  const [formData, setFormData] = useState({
    mecanicosIds: [],
    kmEntrada: '',
    observaciones: '',
  });

  useEffect(() => {
    getMecanicosSimples().then(setMecanicos).catch(() => { });
  }, []);

  const handleToggleMecanico = (numeroDocumento) => {
    setFormData((prev) => {
      const ya = prev.mecanicosIds.includes(numeroDocumento);
      return {
        ...prev,
        mecanicosIds: ya
          ? prev.mecanicosIds.filter((id) => id !== numeroDocumento)
          : [...prev.mecanicosIds, numeroDocumento],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      cotizacionId: cotizacion.id,
      mecanicosIds: formData.mecanicosIds,
      kmEntrada: formData.kmEntrada ? Number(formData.kmEntrada) : null,
      observaciones: formData.observaciones || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>

      {/* Resumen de la cotización */}
      <div className={styles.resumenBox}>
        <div className={styles.resumenRow}>
          <span className={styles.resumenLabel}>Cliente</span>
          <span className={styles.resumenValue}>
            {cotizacion.usuarioNombres && cotizacion.usuarioApellidos
              ? `${cotizacion.usuarioNombres} ${cotizacion.usuarioApellidos}`
              : cotizacion.usuarioId || '—'}
          </span>
        </div>
        <div className={styles.resumenRow}>
          <span className={styles.resumenLabel}>Vehículo</span>
          <span className={styles.resumenValue}>{cotizacion.placaVehiculo || '—'}</span>
        </div>
        <div className={styles.resumenRow}>
          <span className={styles.resumenLabel}>Problema</span>
          <span className={styles.resumenValue}>{cotizacion.descripcionProblema}</span>
        </div>
        <div className={styles.resumenRow}>
          <span className={styles.resumenLabel}>Total cotizado</span>
          <span className={`${styles.resumenValue} ${styles.resumenTotal}`}>
            ${Number(cotizacion.total || 0).toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      <div className={styles.inputGroup}>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Mecánicos asignados</label>
          <div className={styles.mecanicosGrid}>
            {mecanicos.length > 0 ? (
              mecanicos.map((m) => {
                const seleccionado = formData.mecanicosIds.includes(m.numeroDocumento);
                return (
                  <button
                    key={m.numeroDocumento}
                    type="button"
                    className={`${styles.mecanicoCard} ${seleccionado ? styles.mecanicoCardActive : ''}`}
                    onClick={() => handleToggleMecanico(m.numeroDocumento)}
                  >
                    <span className={styles.mecanicoNombre}>{m.nombreCompleto}</span>
                    <span className={styles.mecanicoDoc}>#{m.numeroDocumento}</span>
                  </button>
                );
              })
            ) : (
              <p className={styles.emptyMsg}>No hay mecánicos disponibles</p>
            )}
          </div>
          {formData.mecanicosIds.length > 0 && (
            <small>{formData.mecanicosIds.length} mecánico(s) seleccionado(s)</small>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="kmEntrada">Km de entrada</label>
          <input
            type="number"
            id="kmEntrada"
            name="kmEntrada"
            placeholder="Ej: 45000"
            value={formData.kmEntrada}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            name="observaciones"
            placeholder="Ej: Entregar informe de daños"
            value={formData.observaciones}
            onChange={handleChange}
          />
          <small>Las observaciones son opcionales.</small>
        </div>

      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={() => onSubmit(null)}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          Crear Orden
        </button>
      </div>
    </form>
  );
}