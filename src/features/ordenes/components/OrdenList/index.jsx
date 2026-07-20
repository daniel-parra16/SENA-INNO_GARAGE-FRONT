import { Undo2, Trash2, ArrowRight, CheckCircle, Wrench, PackageCheck, ClipboardList, Truck } from 'lucide-react';
import { useState } from 'react';
import styles from './OrdenList.module.css';

const ESTADO_BADGE = {
  RECIBIDO: { label: 'Recibido', className: 'badgeReceived' },
  EN_DIAGNOSTICO: { label: 'Diagnóstico', className: 'badgeDiag' },
  ESPERANDO_REPUESTOS: { label: 'Esperando repuestos', className: 'badgeWaiting' },
  EN_REPARACION: { label: 'Reparación', className: 'badgeRepair' },
  LISTA: { label: 'Lista', className: 'badgeReady' },
  ENTREGADA: { label: 'Entregada', className: 'badgeDelivered' },
  CANCELADA: { label: 'Cancelada', className: 'badgeCancelled' },
};

const ESTADO_ANTERIOR = {
  EN_DIAGNOSTICO: 'RECIBIDO',
  ESPERANDO_REPUESTOS: 'EN_DIAGNOSTICO',
  EN_REPARACION: 'ESPERANDO_REPUESTOS',
  LISTA: 'EN_REPARACION',
  ENTREGADA: 'LISTA'
};

function formatCurrency(value) {
  if (value == null) return '$ 0';
  return `$ ${Number(value).toLocaleString('es-CO')}`;
}

function formatFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/* ───────── FLUJO DE ESTADOS ───────── */
const getAcciones = (estado) => {
  switch (estado) {

    case 'RECIBIDO':
      return [
        {
          icon: ClipboardList,
          tooltip: 'Enviar a diagnóstico',
          className: styles.btnNext,
          estado: 'EN_DIAGNOSTICO'
        },
        {
          icon: PackageCheck,
          tooltip: 'Esperar repuestos',
          className: styles.btnProcess,
          estado: 'ESPERANDO_REPUESTOS'
        },
        {
          icon: Wrench,
          tooltip: 'Iniciar reparación',
          className: styles.btnProcess,
          estado: 'EN_REPARACION'
        }
      ];

    case 'EN_DIAGNOSTICO':
      return [
        {
          icon: PackageCheck,
          tooltip: 'Esperar repuestos',
          className: styles.btnProcess,
          estado: 'ESPERANDO_REPUESTOS'
        }
      ];

    case 'ESPERANDO_REPUESTOS':
      return [
        {
          icon: Wrench,
          tooltip: 'Iniciar reparación',
          className: styles.btnProcess,
          estado: 'EN_REPARACION'
        }
      ];

    case 'EN_REPARACION':
      return [
        {
          icon: CheckCircle,
          tooltip: 'Marcar lista',
          className: styles.btnDone,
          estado: 'LISTA'
        }
      ];

    case 'LISTA':
      return [
        {
          icon: Truck,
          tooltip: 'Entregar orden',
          className: styles.btnDone,
          estado: 'ENTREGADA'
        }
      ];

    default:
      return [];
  }
};

export default function OrdenList({
  ordenes,
  onDelete,
  onChangeEstado,
  onRefresh,
  canEdit = true
}) {
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

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Mecánicos</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Fecha entrada</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 50 }}>
                  No hay órdenes registradas
                </td>
              </tr>
            ) : (
              ordenes.map((o, index) => {

                const badge = ESTADO_BADGE[o.estado] || {
                  label: o.estado,
                  className: 'badgePending'
                };

                const acciones = getAcciones(o.estado);
                const isLoading = loadingId === o.id;

                return (
                  <tr key={o.id}>

                    <td>{index + 1}</td>

                    <td>
                      <div>{o.usuarioNombres} {o.usuarioApellidos}</div>
                      <div className={styles.subText}>{o.usuarioDocumento}</div>
                    </td>

                    <td>
                      <div>
                        <strong>{o.vehiculoPlaca}</strong>
                        <div className={styles.subText}>
                          {o.vehiculoMarca} {o.vehiculoModelo}
                        </div>
                      </div>
                    </td>

                    <td>
                      {o.mecanicosNombres?.length > 0
                        ? o.mecanicosNombres.join(', ')
                        : <span className={styles.noAsignado}>Sin asignar</span>}
                    </td>

                    <td>
                      <span className={`${styles.badge} ${styles[badge.className]}`}>
                        {badge.label}
                      </span>
                    </td>

                    <td>{formatCurrency(o.total)}</td>

                    <td>{formatFecha(o.fechaEntrada)}</td>

                    <td>
                      <div className={styles.actions}>

                        {/* BOTONES DE FLUJO */}
                        {acciones.map((a, i) => {
                          const Icon = a.icon;

                          return (
                            <button
                              key={i}
                              className={`${styles.btnIcon} ${a.className}`}
                              data-tooltip={a.tooltip}
                              disabled={isLoading}
                              onClick={() => handleEstado(o.id, a.estado)}
                            >
                              <Icon size={16} />
                            </button>
                          );
                        })}

                        {ESTADO_ANTERIOR[o.estado] && (
                          <button
                            className={`${styles.btnIcon} ${styles.btnBack}`}
                            data-tooltip="Volver al estado anterior"
                            disabled={isLoading}
                            onClick={() => handleEstado(o.id, ESTADO_ANTERIOR[o.estado])}
                          >
                            <Undo2 size={16} />
                          </button>
                        )}

                        {/* CANCELAR SIEMPRE */}
                        {o.estado !== 'ENTREGADA' && o.estado !== 'CANCELADA' && (
                          <button
                            className={`${styles.btnIcon} ${styles.btnCancel}`}
                            data-tooltip="Cancelar orden"
                            disabled={isLoading}
                            onClick={() => handleEstado(o.id, 'CANCELADA')}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}