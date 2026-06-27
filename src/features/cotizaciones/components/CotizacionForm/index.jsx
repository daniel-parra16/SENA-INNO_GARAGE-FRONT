import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './CotizacionForm.module.css';

const insumoVacio = () => ({ nombre: '', cantidad: 1, precioUnitario: '' });

export default function CotizacionForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState({
        agendamientoId: initialData?.agendamientoId || '',
        fechaEntrada: initialData?.fechaEntrada ? initialData.fechaEntrada.slice(0, 16) : '',
        fechaEstimadaSalida: initialData?.fechaEstimadaSalida ? initialData.fechaEstimadaSalida.slice(0, 16) : '',
        descripcionProblema: initialData?.descripcionProblema || '',
        observaciones: initialData?.observaciones || '',
    });
    const [insumos, setInsumos] = useState(
        initialData?.insumos?.length > 0
            ? initialData.insumos.map(({ nombre, cantidad, precioUnitario }) => ({ nombre, cantidad, precioUnitario }))
            : [insumoVacio()]
    );

    useEffect(() => {
        setFormData({
            agendamientoId: initialData?.agendamientoId || '',
            fechaEntrada: initialData?.fechaEntrada ? initialData.fechaEntrada.slice(0, 16) : '',
            fechaEstimadaSalida: initialData?.fechaEstimadaSalida ? initialData.fechaEstimadaSalida.slice(0, 16) : '',
            descripcionProblema: initialData?.descripcionProblema || '',
            observaciones: initialData?.observaciones || '',
        });
        setInsumos(
            initialData?.insumos?.length > 0
                ? initialData.insumos.map(({ nombre, cantidad, precioUnitario }) => ({ nombre, cantidad, precioUnitario }))
                : [insumoVacio()]
        );
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInsumoChange = (index, e) => {
        const { name, value } = e.target;
        setInsumos((prev) =>
            prev.map((item, i) => i === index ? { ...item, [name]: value } : item)
        );
    };

    const addInsumo = () => setInsumos((prev) => [...prev, insumoVacio()]);

    const removeInsumo = (index) => {
        if (insumos.length === 1) return;
        setInsumos((prev) => prev.filter((_, i) => i !== index));
    };

    const subtotal = insumos.reduce((acc, ins) => {
        const cant = Number(ins.cantidad) || 0;
        const precio = Number(ins.precioUnitario) || 0;
        return acc + cant * precio;
    }, 0);
    const impuesto = subtotal * 0.19;
    const total = subtotal + impuesto;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            agendamientoId: formData.agendamientoId || null,
            insumos: insumos.map((ins) => ({
                nombre: ins.nombre,
                cantidad: Number(ins.cantidad),
                precioUnitario: Number(ins.precioUnitario),
            })),
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputGroup}>

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
                        <label>Insumos</label>
                        <button type="button" className={styles.addInsumoBtn} onClick={addInsumo}>
                            <Plus size={14} />
                            Agregar insumo
                        </button>
                    </div>

                    <div className={styles.insumosTable}>
                        <div className={styles.insumosHead}>
                            <span>Nombre</span>
                            <span>Cantidad</span>
                            <span>Precio unitario</span>
                            <span>Subtotal</span>
                            <span></span>
                        </div>
                        {insumos.map((ins, index) => {
                            const sub = (Number(ins.cantidad) || 0) * (Number(ins.precioUnitario) || 0);
                            return (
                                <div key={index} className={styles.insumoRow}>
                                    <input
                                        name="nombre"
                                        placeholder="Ej: Amortiguador"
                                        value={ins.nombre}
                                        onChange={(e) => handleInsumoChange(index, e)}
                                        required
                                    />
                                    <input
                                        name="cantidad"
                                        type="number"
                                        min={1}
                                        placeholder="1"
                                        value={ins.cantidad}
                                        onChange={(e) => handleInsumoChange(index, e)}
                                        required
                                    />
                                    <input
                                        name="precioUnitario"
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        value={ins.precioUnitario}
                                        onChange={(e) => handleInsumoChange(index, e)}
                                        required
                                    />
                                    <span className={styles.insumoSubtotal}>
                                        ${sub.toLocaleString('es-CO')}
                                    </span>
                                    <button
                                        type="button"
                                        className={styles.removeInsumoBtn}
                                        onClick={() => removeInsumo(index)}
                                        disabled={insumos.length === 1}
                                        title="Eliminar insumo"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Resumen de totales */}
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