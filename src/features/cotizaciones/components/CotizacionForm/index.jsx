import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './CotizacionForm.module.css';
import { getUsuariosSimples } from '../../../usuarios/services';
import { getVehiculoByUser } from '../../../vehiculos/services';
import { getRepuestos } from '../../../inventario/services';

const itemVacio = () => ({ tipo: 'REPUESTO', repuestoId: '', descripcion: '', cantidad: 1, precioUnitario: '' });

export default function CotizacionForm({ onSubmit, initialData = null, desdeAgendamiento = false }) {
    const [usuarios, setUsuarios] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [repuestos, setRepuestos] = useState([]);

    const [formData, setFormData] = useState({
        usuarioId: initialData?.usuarioId || '',
        placaVehiculo: initialData?.placaVehiculo || '',
        fechaEntrada: initialData?.fechaEntrada ? initialData.fechaEntrada.slice(0, 16) : '',
        fechaEstimadaSalida: initialData?.fechaEstimadaSalida ? initialData.fechaEstimadaSalida.slice(0, 16) : '',
        descripcionProblema: initialData?.descripcionProblema || '',
        observaciones: initialData?.observaciones || '',
    });

    const [insumos, setInsumos] = useState(
        initialData?.insumos?.length > 0
            ? initialData.insumos.map(({ tipo, repuestoId, descripcion, cantidad, precioUnitario }) => ({
                tipo: tipo || 'REPUESTO', repuestoId: repuestoId || '', descripcion, cantidad, precioUnitario
            }))
            : [itemVacio()]
    );

    useEffect(() => {
        if (!desdeAgendamiento) {
            getUsuariosSimples().then(setUsuarios).catch(() => { });
        }
        getRepuestos()
            .then((data) => setRepuestos(data?.contenido || data || []))
            .catch(() => { });
    }, []);

    useEffect(() => {
        setFormData({
            usuarioId: initialData?.usuarioId || '',
            placaVehiculo: initialData?.placaVehiculo || '',
            fechaEntrada: initialData?.fechaEntrada ? initialData.fechaEntrada.slice(0, 16) : '',
            fechaEstimadaSalida: initialData?.fechaEstimadaSalida ? initialData.fechaEstimadaSalida.slice(0, 16) : '',
            descripcionProblema: initialData?.descripcionProblema || '',
            observaciones: initialData?.observaciones || '',
        });
        setInsumos(
            initialData?.insumos?.length > 0
                ? initialData.insumos.map(({ tipo, repuestoId, descripcion, cantidad, precioUnitario }) => ({
                    tipo: tipo || 'REPUESTO', repuestoId: repuestoId || '', descripcion, cantidad, precioUnitario
                }))
                : [itemVacio()]
        );
        if (initialData?.usuarioId && !desdeAgendamiento) {
            getVehiculoByUser(initialData.usuarioId).then(setVehiculos).catch(() => setVehiculos([]));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'usuarioId') {
            setFormData((prev) => ({ ...prev, usuarioId: value, placaVehiculo: '' }));
            setVehiculos([]);
            if (value) getVehiculoByUser(value).then(setVehiculos).catch(() => setVehiculos([]));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInsumoChange = (index, field, value) => {
        setInsumos((prev) => {
            const copia = [...prev];
            copia[index] = { ...copia[index], [field]: value };
            if (field === 'tipo') {
                copia[index].repuestoId = '';
                copia[index].descripcion = '';
                copia[index].precioUnitario = '';
            }
            return copia;
        });
    };

    // Nueva función para actualizar múltiples campos a la vez
    const handleRepuestoSelect = (index, repuestoId) => {
        const rep = repuestos.find((r) => r.id === repuestoId);
        setInsumos((prev) => {
            const copia = [...prev];
            copia[index] = {
                ...copia[index],
                repuestoId,
                descripcion: rep?.nombre || '',
                precioUnitario: rep?.precio ?? rep?.precioUnitario ?? '',
            };
            return copia;
        });
    };

    const addInsumo = () => setInsumos((prev) => [...prev, itemVacio()]);
    const removeInsumo = (index) => {
        if (insumos.length === 1) return;
        setInsumos((prev) => prev.filter((_, i) => i !== index));
    };

    const subtotal = insumos.reduce((acc, ins) => {
        return acc + (Number(ins.cantidad) || 0) * (Number(ins.precioUnitario) || 0);
    }, 0);
    const impuesto = subtotal * 0.19;
    const total = subtotal + impuesto;

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            fechaEntrada: formData.fechaEntrada,
            fechaEstimadaSalida: formData.fechaEstimadaSalida,
            descripcionProblema: formData.descripcionProblema,
            observaciones: formData.observaciones || null,
            insumos: insumos.map((ins) => ({
                tipo: ins.tipo,
                repuestoId: ins.tipo === 'REPUESTO' && ins.repuestoId ? ins.repuestoId : null,
                descripcion: ins.descripcion,
                cantidad: Number(ins.cantidad),
                precioUnitario: Number(ins.precioUnitario),
            })),
        };

        // Solo incluye usuario y vehículo si no viene de agendamiento
        if (!desdeAgendamiento) {
            payload.usuarioId = formData.usuarioId;
            payload.placaVehiculo = formData.placaVehiculo;
        }

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputGroup}>

                {/* Solo si NO viene de agendamiento */}
                {!desdeAgendamiento && (
                    <>
                        <div className={styles.field}>
                            <label htmlFor="usuarioId">Cliente</label>
                            <select
                                id="usuarioId"
                                name="usuarioId"
                                value={formData.usuarioId}
                                onChange={handleChange}
                                required
                            >
                                <option value="" hidden>Seleccione un cliente</option>
                                {usuarios.map((u) => (
                                    <option key={u.numeroDocumento} value={u.numeroDocumento}>
                                        {u.numeroDocumento} - {u.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="placaVehiculo">Vehículo</label>
                            <select
                                id="placaVehiculo"
                                name="placaVehiculo"
                                value={formData.placaVehiculo}
                                onChange={handleChange}
                                required
                                disabled={!formData.usuarioId}
                            >
                                <option value="" hidden>
                                    {formData.usuarioId ? 'Seleccione un vehículo' : 'Primero seleccione un cliente'}
                                </option>
                                {vehiculos.map((v) => (
                                    <option key={v.placa} value={v.placa}>
                                        {v.placa} - {v.marca} {v.modelo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                <div className={styles.field}>
                    <label htmlFor="fechaEntrada">Fecha de entrada</label>
                    <input
                        type="datetime-local"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={formData.fechaEntrada}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="fechaEstimadaSalida">Fecha estimada de salida</label>
                    <input
                        type="datetime-local"
                        id="fechaEstimadaSalida"
                        name="fechaEstimadaSalida"
                        value={formData.fechaEstimadaSalida}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="descripcionProblema">Descripción del problema</label>
                    <textarea
                        id="descripcionProblema"
                        name="descripcionProblema"
                        placeholder="Ej: Ruido en la parte delantera"
                        value={formData.descripcionProblema}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Insumos */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <div className={styles.insumosHeader}>
                        <label>Insumos y servicios</label>
                        <button type="button" className={styles.addInsumoBtn} onClick={addInsumo}>
                            <Plus size={14} /> Agregar ítem
                        </button>
                    </div>

                    <div className={styles.insumosTable}>
                        <div className={styles.insumosHead}>
                            <span>Tipo</span>
                            <span>Descripción</span>
                            <span>Cant.</span>
                            <span>Precio unit.</span>
                            <span>Subtotal</span>
                            <span></span>
                        </div>

                        {insumos.map((ins, index) => {
                            const sub = (Number(ins.cantidad) || 0) * (Number(ins.precioUnitario) || 0);
                            return (
                                <div key={index} className={styles.insumoRow}>
                                    {/* Tipo */}
                                    <select
                                        value={ins.tipo}
                                        onChange={(e) => handleInsumoChange(index, 'tipo', e.target.value)}
                                        className={styles.insumoSelect}
                                    >
                                        <option value="REPUESTO">Repuesto</option>
                                        <option value="MANO_DE_OBRA">Mano de obra</option>
                                    </select>

                                    {/* Descripción */}
                                    {/* Descripción — select si REPUESTO, input si MANO_DE_OBRA */}
                                    {ins.tipo === 'REPUESTO' ? (
                                        <select
                                            className={styles.insumoSelect}
                                            value={ins.repuestoId}
                                            onChange={(e) => handleRepuestoSelect(index, e.target.value)}
                                            required
                                        >
                                            <option value="" hidden>Seleccione un repuesto</option>
                                            {repuestos.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.nombre} — ${Number(r.precio ?? r.precioUnitario ?? 0).toLocaleString('es-CO')}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            placeholder="Ej: Diagnóstico general"
                                            value={ins.descripcion}
                                            onChange={(e) => handleInsumoChange(index, 'descripcion', e.target.value)}
                                            required
                                        />
                                    )}

                                    {/* Cantidad */}
                                    <input
                                        type="number"
                                        min={1}
                                        value={ins.cantidad}
                                        onChange={(e) => handleInsumoChange(index, 'cantidad', e.target.value)}
                                        required
                                    />

                                    {/* Precio unitario */}
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        value={ins.precioUnitario}
                                        onChange={(e) => handleInsumoChange(index, 'precioUnitario', e.target.value)}
                                        required
                                        readOnly={ins.tipo === 'REPUESTO'}
                                        className={ins.tipo === 'REPUESTO' ? styles.inputReadOnly : ''}
                                    />

                                    <span className={styles.insumoSubtotal}>
                                        ${sub.toLocaleString('es-CO')}
                                    </span>

                                    <button
                                        type="button"
                                        className={styles.removeInsumoBtn}
                                        onClick={() => removeInsumo(index)}
                                        disabled={insumos.length === 1}
                                        title="Eliminar"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.totalesBox}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>IVA (19%)</span>
                            <span>${impuesto.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                            <span>Total</span>
                            <span>${total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        placeholder="Ej: Revisar frenos también"
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
                    {initialData ? 'Actualizar Cotización' : 'Crear Cotización'}
                </button>
            </div>
        </form>
    );
}