import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './OrdenForm.module.css';
import {
  getAllSimpleMecanicos,
  getAllSimpleUsers,
  getAllVehicleByNumDoc,
  getAllRepuestos
} from '../../services';

const itemVacio = () => ({
  repuestoId: '',
  tipo: 'REPUESTO',
  descripcion: '',
  cantidad: 1,
  precioUnitario: '',
});

function formatCurrency(value) {
  if (!value) return '$ 0';
  return `$ ${Number(value).toLocaleString('es-CO')}`;
}

export default function OrdenForm({ initialData, onSubmit, onClose }) {

  const [users, setUsers] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);

  const [form, setForm] = useState({
    placaVehiculo: initialData?.vehiculoPlaca || '',
    cedulaUsuario: initialData?.usuarioDocumento || '',
    cedulaMecanico: initialData?.mecanicoId || '',
    descripcionProblema: initialData?.descripcionProblema || '',
    diagnostico: initialData?.diagnostico || '',
    kmEntrada: initialData?.kmEntrada || '',
    kmSalida: initialData?.kmSalida || '',
    fechaEstimadaEntrega: initialData?.fechaEstimadaEntrega
      ? initialData.fechaEstimadaEntrega.slice(0, 16)
      : '',
    observaciones: initialData?.observaciones || '',
  });

  const [items, setItems] = useState(
    initialData?.items?.map(i => ({
      repuestoId: i.repuestoId || '',
      tipo: i.tipo || 'REPUESTO',
      descripcion: i.descripcion || '',
      cantidad: i.cantidad || 1,
      precioUnitario: i.precioUnitario || '',
    })) || []
  );

  const esEdicion = !!initialData;

  // ── Cargar datos iniciales ──
  useEffect(() => {
    const load = async () => {
      try {
        const [u, m, r] = await Promise.all([
          getAllSimpleUsers(),
          getAllSimpleMecanicos(),
          getAllRepuestos(),
        ]);
        setUsers(u);
        setMecanicos(m);
        setRepuestos(r);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  // Si es edición, cargar vehículos del usuario ya asignado
  useEffect(() => {
    if (initialData?.usuarioDocumento) {
      getAllVehicleByNumDoc(initialData.usuarioDocumento)
        .then(setVehiculos)
        .catch(console.error);
    }
  }, []);

  // ── Cambios del form base ──
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cedulaUsuario') {
      setForm(prev => ({ ...prev, placaVehiculo: '', [name]: value }));
      setVehiculos([]);
      if (value) {
        getAllVehicleByNumDoc(value).then(setVehiculos).catch(console.error);
      }
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ── Manejo de items ──
  const agregarItem = () => setItems(prev => [...prev, itemVacio()]);

  const eliminarItem = (index) =>
    setItems(prev => prev.filter((_, i) => i !== index));

  const handleItemChange = (index, field, value) => {
    setItems(prev => {
      const copia = [...prev];
      copia[index] = { ...copia[index], [field]: value };

      // Si selecciona un repuesto, autocompletar precio y descripción
      if (field === 'repuestoId' && value) {
        const rep = repuestos.find(r => r.id === value);
        if (rep) {
          copia[index].precioUnitario = rep.precio;
          copia[index].descripcion = rep.nombre;
        }
      }

      return copia;
    });
  };

  // ── Totales calculados ──
  const subtotal = items.reduce((acc, item) => {
    const precio = parseFloat(item.precioUnitario) || 0;
    const cant = parseInt(item.cantidad) || 0;
    return acc + precio * cant;
  }, 0);
  const impuesto = subtotal * 0.19;
  const total = subtotal + impuesto;

  // ── Submit ──
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      kmEntrada: form.kmEntrada ? parseInt(form.kmEntrada) : null,
      kmSalida: form.kmSalida ? parseInt(form.kmSalida) : null,
      fechaEstimadaEntrega: form.fechaEstimadaEntrega || null,
      items: items.map(i => ({
        repuestoId: i.repuestoId || null,
        tipo: i.tipo,
        descripcion: i.descripcion,
        cantidad: parseInt(i.cantidad),
        precioUnitario: parseFloat(i.precioUnitario),
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>

      {/* ── SECCIÓN: Datos generales ── */}
      <div className={styles.sectionTitle}>Datos generales</div>
      <div className={styles.inputGroup}>

        {/* Fila 1: Usuario | Vehículo | Mecánico */}
        <div className={styles.fieldRow3}>
          <div className={styles.field}>
            <label className={styles.label}>Usuario</label>
            <select name="cedulaUsuario" className={styles.input}
              value={form.cedulaUsuario} onChange={handleChange}
              required disabled={esEdicion}>
              <option value="" hidden>Seleccione un usuario</option>
              {users.map(u => (
                <option key={u.numeroDocumento} value={u.numeroDocumento}>
                  {u.nombreCompleto}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Vehículo</label>
            <select name="placaVehiculo" className={styles.input}
              value={form.placaVehiculo} onChange={handleChange}
              required disabled={esEdicion || !form.cedulaUsuario}>
              <option value="" hidden>
                {form.cedulaUsuario ? 'Seleccione un vehículo' : 'Primero seleccione un usuario'}
              </option>
              {vehiculos.map(v => (
                <option key={v.placa} value={v.placa}>
                  {v.placa} — {v.marca} {v.modelo}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Mecánico <span className={styles.opcional}>(opcional)</span>
            </label>
            <select name="cedulaMecanico" className={styles.input}
              value={form.cedulaMecanico} onChange={handleChange}>
              <option value="">Sin asignar</option>
              {mecanicos.map(m => (
                <option key={m.numeroDocumento} value={m.numeroDocumento}>
                  {m.nombreCompleto}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fila 2: Km entrada | Fecha estimada */}
        <div className={styles.fieldRow2}>
          <div className={styles.field}>
            <label className={styles.label}>Km de entrada</label>
            <input type="number" name="kmEntrada" className={styles.input}
              value={form.kmEntrada} onChange={handleChange}
              placeholder="Ej: 45000" min={0} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Fecha estimada de entrega</label>
            <input type="datetime-local" name="fechaEstimadaEntrega" className={styles.input}
              value={form.fechaEstimadaEntrega} onChange={handleChange} />
          </div>
        </div>

        {/* Fila 3: Descripción | Observaciones */}
        <div className={styles.fieldRow2Textarea}>
          <div className={styles.field}>
            <label className={styles.label}>Descripción del problema</label>
            <textarea name="descripcionProblema"
              className={`${styles.input} ${styles.textarea}`}
              value={form.descripcionProblema} onChange={handleChange}
              placeholder="Describe el problema del vehículo..."
              rows={4} required />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Observaciones <span className={styles.opcional}>(opcional)</span>
            </label>
            <textarea name="observaciones"
              className={`${styles.input} ${styles.textarea}`}
              value={form.observaciones} onChange={handleChange}
              placeholder="Observaciones adicionales..."
              rows={4} />
          </div>
        </div>

        {/* Solo edición: Diagnóstico + Km salida */}
        {esEdicion && (
          <div className={styles.fieldRow2}>
            <div className={styles.field}>
              <label className={styles.label}>
                Diagnóstico <span className={styles.opcional}>(opcional)</span>
              </label>
              <textarea name="diagnostico"
                className={`${styles.input} ${styles.textarea}`}
                value={form.diagnostico} onChange={handleChange}
                placeholder="Diagnóstico técnico del vehículo..."
                rows={3} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Km de salida</label>
              <input type="number" name="kmSalida" className={styles.input}
                value={form.kmSalida} onChange={handleChange}
                placeholder="Ej: 45200" min={0} />
            </div>
          </div>
        )}

      </div>

      {/* ── SECCIÓN: Items / Repuestos ── */}
      <div className={styles.sectionTitle}>
        Repuestos y servicios
        <button type="button" className={styles.addItemBtn} onClick={agregarItem}>
          <Plus size={14} /> Agregar ítem
        </button>
      </div>

      {items.length === 0 ? (
        <p className={styles.emptyItems}>No hay ítems agregados. La cotización se creará sin repuestos.</p>
      ) : (
        <div className={styles.itemsContainer}>
          {items.map((item, index) => (
            <div key={index} className={styles.itemRow}>

              {/* Repuesto */}
              <div className={styles.itemField}>
                <label className={styles.label}>Repuesto</label>
                <select
                  className={styles.input}
                  value={item.repuestoId}
                  onChange={(e) => handleItemChange(index, 'repuestoId', e.target.value)}
                >
                  <option value="">Seleccionar repuesto</option>
                  {repuestos.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nombre} — {formatCurrency(r.precio)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div className={styles.itemField}>
                <label className={styles.label}>Descripción</label>
                <input
                  type="text"
                  className={styles.input}
                  value={item.descripcion}
                  onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                  placeholder="Descripción del ítem"
                  required
                />
              </div>

              {/* Cantidad */}
              <div className={styles.itemFieldSmall}>
                <label className={styles.label}>Cant.</label>
                <input
                  type="number"
                  className={styles.input}
                  value={item.cantidad}
                  onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
                  min={1}
                  required
                />
              </div>

              {/* Precio unitario */}
              <div className={styles.itemFieldSmall}>
                <label className={styles.label}>Precio unit.</label>
                <input
                  type="number"
                  className={styles.input}
                  value={item.precioUnitario}
                  onChange={(e) => handleItemChange(index, 'precioUnitario', e.target.value)}
                  placeholder="0"
                  min={0}
                  required
                />
              </div>

              {/* Subtotal (solo lectura) */}
              <div className={styles.itemFieldSmall}>
                <label className={styles.label}>Subtotal</label>
                <input
                  type="text"
                  className={`${styles.input} ${styles.readOnly}`}
                  value={formatCurrency((parseFloat(item.precioUnitario) || 0) * (parseInt(item.cantidad) || 0))}
                  readOnly
                />
              </div>

              {/* Eliminar */}
              <button
                type="button"
                className={styles.deleteItemBtn}
                onClick={() => eliminarItem(index)}
                title="Eliminar ítem"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>
      )}

      {/* ── Resumen de totales ── */}
      {items.length > 0 && (
        <div className={styles.totalesContainer}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>IVA (19%)</span>
            <span>{formatCurrency(impuesto)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.totalFinal}`}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      )}

      {/* ── Acciones ── */}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn}>
          {esEdicion ? 'Actualizar Orden' : 'Crear Cotización'}
        </button>
      </div>

    </form>
  );
}