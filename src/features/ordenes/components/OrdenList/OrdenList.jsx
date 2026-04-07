import { Edit, Trash2, RefreshCcw } from 'lucide-react';

export default function OrdenList({
  ordenes,
  onEdit,
  onDelete,
  onChangeEstado,
  onConvert
}) {

  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Vehículo</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {ordenes.map(o => (
          <tr key={o.id}>
            <td>{o.tipo}</td>
            <td>{o.estado}</td>
            <td>{o.vehiculoId}</td>
            <td>{o.totalEstimado}</td>

            <td>
              <button onClick={() => onEdit(o)}>
                <Edit />
              </button>

              <button onClick={() => onDelete(o)}>
                <Trash2 />
              </button>

              {o.tipo === 'COTIZACION' && (
                <button onClick={() => onConvert(o.id)}>
                  Convertir
                </button>
              )}

              <button onClick={() =>
                onChangeEstado(o.id, "ORDEN_EN_REPARACION")
              }>
                <RefreshCcw />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}