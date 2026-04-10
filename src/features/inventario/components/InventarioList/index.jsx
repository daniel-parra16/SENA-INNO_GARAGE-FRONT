import { Edit, Trash2 } from 'lucide-react';
import styles from './InventarioList.module.css';

export function InventarioList({ repuestos, onEdit, onDelete }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Referencia</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {repuestos.map((rep, index) => (
              <tr key={rep.id}>
                <td className={styles.idCell}>{index + 1}</td>
                <td>{rep.nombre}</td>
                <td>{rep.referencia}</td>
                <td>{rep.marca}</td>

                <td className={styles.stockCell}>
                  {rep.stock}

                  {rep.stockBajo && (
                    <div className={styles.tooltipContainer}>
                      <span className={styles.warning}>⚠</span>

                      <span className={styles.tooltip}>
                        Stock bajo <span className={styles.warning}>⚠</span> <br />
                        Recomendado mínimo: {rep.stockMinimo}
                      </span>
                    </div>
                  )}
                </td>

                <td>${rep.precio}</td>

                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => onEdit(rep)}>
                      <Edit size={16} />
                    </button>
                    <button className={styles.actionBtn} onClick={() => onDelete(rep)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}