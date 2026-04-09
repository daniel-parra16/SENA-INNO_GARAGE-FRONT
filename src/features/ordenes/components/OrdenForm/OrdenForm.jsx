import { useState, useEffect } from 'react';
import styles from './OrdenForm.module.css';

export default function OrdenForm({ initialData, onSubmit }) {

  const [users, setUsers] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [form, setForm] = useState({
    placaVehiculo: initialData?.placaVehiculo || '',
    cedulaUsuario: initialData?.cedulaUsuario || '',
    cedulaMecanico: initialData?.cedulaMecanico || '',
    descripcionProblema: initialData?.descripcionProblema || '',
    kmEntrada: initialData?.kmEntrada || '',
    fechaEstimadaEntrega: initialData?.fechaEstimadaEntrega || '',
    observaciones: initialData?.observaciones || '',
  });

  useEffect(() => {
    // TODO: fetch users
    // fetch('/api/usuarios').then(r => r.json()).then(setUsers);

    // TODO: fetch mecanicos
    // fetch('/api/usuarios?rol=mecanico').then(r => r.json()).then(setMecanicos);

    // TODO: fetch vehiculos
    // fetch('/api/vehiculos').then(r => r.json()).then(setVehiculos);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>

      <div className={styles.inputGroup}>

        {/* Usuario */}
        <div className={styles.field}>
          <label htmlFor="cedulaUsuario" className={styles.label}>Usuario</label>
          <select
            id="cedulaUsuario"
            name="cedulaUsuario"
            className={styles.input}
            value={form.cedulaUsuario}
            onChange={handleChange}
            required
          >
            <option value="" hidden>Seleccione un usuario</option>
            {/* TODO: mapear usuarios desde el back */}
            {users.map((user) => (
              <option key={user.numeroDocumento} value={user.numeroDocumento}>
                {user.nombreCompleto}
              </option>
            ))}
          </select>
        </div>

        {/* Placa del vehículo */}
        <div className={styles.field}>
          <label htmlFor="placaVehiculo" className={styles.label}>Placa del Vehículo</label>
          <select
            id="placaVehiculo"
            name="placaVehiculo"
            className={styles.input}
            value={form.placaVehiculo}
            onChange={handleChange}
            required
          >
            <option value="" hidden>Seleccione un vehículo</option>
            {/* TODO: mapear vehículos desde el back */}
            {vehiculos.map((v) => (
              <option key={v.placa} value={v.placa}>
                {v.placa}
              </option>
            ))}
          </select>
        </div>

        {/* KM de entrada */}
        <div className={styles.field}>
          <label htmlFor="kmEntrada" className={styles.label}>Kilometraje de Entrada</label>
          <input
            type="number"
            id="kmEntrada"
            name="kmEntrada"
            className={styles.input}
            value={form.kmEntrada}
            onChange={handleChange}
            placeholder="Ej: 45000"
            min={0}
          />
        </div>

        {/* Fecha estimada de entrega */}
        <div className={styles.field}>
          <label htmlFor="fechaEstimadaEntrega" className={styles.label}>Fecha Estimada de Entrega</label>
          <input
            type="datetime-local"
            id="fechaEstimadaEntrega"
            name="fechaEstimadaEntrega"
            className={styles.input}
            value={form.fechaEstimadaEntrega}
            onChange={handleChange}
          />
        </div>

        {/* Descripción del problema */}
        <div className={styles.field}>
          <label htmlFor="descripcionProblema" className={styles.label}>Descripción del Problema</label>
          <textarea
            id="descripcionProblema"
            name="descripcionProblema"
            className={`${styles.input} ${styles.textarea}`}
            value={form.descripcionProblema}
            onChange={handleChange}
            placeholder="Describe el problema del vehículo..."
            rows={4}
            required
          />
        </div>

        {/* Observaciones */}
        <div className={styles.field}>
          <label htmlFor="observaciones" className={styles.label}>Observaciones <span className={styles.opcional}>(opcional)</span></label>
          <textarea
            id="observaciones"
            name="observaciones"
            className={`${styles.input} ${styles.textarea}`}
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones adicionales..."
            rows={3}
          />
        </div>

        {/* Mecánico */}
        <div className={styles.field}>
          <label htmlFor="cedulaMecanico" className={styles.label}>Mecánico</label>
          <select
            id="cedulaMecanico"
            name="cedulaMecanico"
            className={styles.input}
            value={form.cedulaMecanico}
            onChange={handleChange}
          >
            <option value="">Sin asignar</option>
            {/* TODO: mapear mecánicos desde el back */}
            {mecanicos.map((mec) => (
              <option key={mec.numeroDocumento} value={mec.numeroDocumento}>
                {mec.nombreCompleto}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Acciones */}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={() => onSubmit(null)}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Actualizar Orden' : 'Crear Orden'}
        </button>
      </div>

    </form>
  );
}