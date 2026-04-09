import { Edit, Trash2, ArrowRightCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import styles from './OrdenList.module.css';

const ESTADOS_COTIZACION = [
  { value: 'COTIZACION_PENDIENTE', label: 'Pendiente' },
  { value: 'COTIZACION_APROBADA', label: 'Aprobada' },
  { value: 'COTIZACION_RECHAZADA', label: 'Rechazada' },
  { value: 'COTIZACION_VENCIDA', label: 'Vencida' },
];

const ESTADOS_ORDEN = [
  { value: 'ORDEN_RECIBIDO', label: 'Recibido' },
  { value: 'ORDEN_EN_DIAGNOSTICO', label: 'En diagnóstico' },
  { value: 'ORDEN_ESPERANDO_REPUESTOS', label: 'Esperando repuestos' },
  { value: 'ORDEN_EN_REPARACION', label: 'En reparación' },
  { value: 'ORDEN_LISTA', label: 'Lista' },
  { value: 'ORDEN_ENTREGADA', label: 'Entregada' },
  { value: 'ORDEN_CANCELADA', label: 'Cancelada' },
];

const ESTADO_BADGE = {
  COTIZACION_PENDIENTE: { label: 'Pendiente', className: 'badgePending' },
  COTIZACION_APROBADA: { label: 'Aprobada', className: 'badgeApproved' },
  COTIZACION_RECHAZADA: { label: 'Rechazada', className: 'badgeRejected' },
  COTIZACION_VENCIDA: { label: 'Vencida', className: 'badgeExpired' },
  ORDEN_RECIBIDO: { label: 'Recibido', className: 'badgeReceived' },
  ORDEN_EN_DIAGNOSTICO: { label: 'En diagnóstico', className: 'badgeDiag' },
  ORDEN_ESPERANDO_REPUESTOS: { label: 'Esp. repuestos', className: 'badgeWaiting' },
  ORDEN_EN_REPARACION: { label: 'En reparación', className: 'badgeRepair' },
  ORDEN_LISTA: { label: 'Lista', className: 'badgeReady' },
  ORDEN_ENTREGADA: { label: 'Entregada', className: 'badgeDelivered' },
  ORDEN_CANCELADA: { label: 'Cancelada', className: 'badgeCancelled' },
};

function formatCurrency(value) {
  if (value == null) return '$ 0';
  return `$ ${Number(value).toLocaleString('es-CO')}`;
}

function formatFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

export default function OrdenList({ ordenes, onEdit, onDelete, onChangeEstado, onConvert, onRefresh }) {

  const [loadingId, setLoadingId] = useState(null);

  const handleEstado = async (id, estado) => {
    setLoadingId(id);
    try {
      await onChangeEstado(id, estado);
      onRefresh();
    } finally {
      setLoadingId(null);
    }
  };

  const handleConvert = async (id) => {
    setLoadingId(id);
    try {
      await onConvert(id);
      onRefresh();
    } finally {
      setLoadingId(null);
    }
  };

  if (!ordenes.length) {
    return (
      <div className={styles.empty}>
        <p>No hay órdenes registradas</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Mecánico</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Fecha ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((o, index) => {
              const badge = ESTADO_BADGE[o.estado] || { label: o.estado, className: 'badgePending' };
              const estados = o.tipo === 'COTIZACION' ? ESTADOS_COTIZACION : ESTADOS_ORDEN;
              const isLoading = loadingId === o.id;

              return (
                <tr key={o.id}>
                  <td className={styles.idCell}>{index + 1}</td>

                  <td>
                    <span className={`${styles.tipoBadge} ${o.tipo === 'COTIZACION' ? styles.tipoCotizacion : styles.tipoOrden}`}>
                      {o.tipo === 'COTIZACION' ? 'Cotización' : 'Orden'}
                    </span>
                  </td>

                  <td className={styles.nameCell}>
                    <div>{o.usuarioNombres} {o.usuarioApellidos}</div>
                    <div className={styles.subText}>{o.usuarioDocumento}</div>
                  </td>

                  <td>
                    <div className={styles.vehiculoInfo}>
                      <span className={styles.placa}>{o.vehiculoPlaca}</span>
                      <span className={styles.subText}>{o.vehiculoMarca} {o.vehiculoModelo} {o.vehiculoAnio}</span>
                    </div>
                  </td>

                  <td>{o.mecanicoNombres || <span className={styles.noAsignado}>Sin asignar</span>}</td>

                  <td>
                    <span className={`${styles.badge} ${styles[badge.className]}`}>
                      {badge.label}
                    </span>
                  </td>

                  <td className={styles.totalCell}>{formatCurrency(o.total)}</td>

                  <td>{formatFecha(o.fechaIngreso)}</td>

                  <td>
                    <div className={styles.actionButtons}>

                      {/* Cambiar estado */}
                      <div className={styles.estadoSelect}>
                        <ChevronDown size={12} />
                        <select
                          disabled={isLoading}
                          onChange={(e) => {
                            if (e.target.value) handleEstado(o.id, e.target.value);
                            e.target.value = '';
                          }}
                          defaultValue=""
                          title="Cambiar estado"
                        >
                          <option value="" disabled>Estado</option>
                          {estados.map(e => (
                            <option key={e.value} value={e.value}>{e.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Convertir cotización → orden */}
                      {o.tipo === 'COTIZACION' && o.estado === 'COTIZACION_APROBADA' && (
                        <button
                          className={`${styles.actionBtn} ${styles.actionBtnConvert}`}
                          title="Convertir a orden"
                          disabled={isLoading}
                          onClick={() => handleConvert(o.id)}
                        >
                          <ArrowRightCircle size={18} />
                        </button>
                      )}

                      {/* Editar */}
                      <button
                        className={styles.actionBtn}
                        title="Editar"
                        onClick={() => onEdit(o)}
                      >
                        <Edit size={18} />
                      </button>

                      {/* Eliminar */}
                      <button
                        className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                        title="Desactivar"
                        onClick={() => onDelete(o)}
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}