import { Edit, Trash2 } from 'lucide-react';
import styles from './InventarioList.module.css';

function normalizeCategory(category) {
  return String(category || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return '$0.00';

  return `$${amount.toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function InventarioList({ repuestos, onEdit, onDelete }) {
  const maxStock = repuestos.reduce((max, rep) => {
    const stock = Number(rep.stock) || 0;
    return stock > max ? stock : max;
  }, 1);

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
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {repuestos.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyCell}>
                  No hay repuestos registrados
                </td>
              </tr>
            ) : (
              repuestos.map((rep, index) => {
                const categoria =
                  rep.categoriaNombre ||
                  rep.nombreCategoria ||
                  (typeof rep.categoria === 'string' ? rep.categoria : rep.categoria?.nombre) ||
                  'Sin categoría';
                const categoryKey = normalizeCategory(categoria);

                const stock = Number(rep.stock) || 0;
                const stockPercent = Math.max(0, Math.min(100, Math.round((stock / maxStock) * 100)));

                return (
                  <tr key={rep.id}>
                    <td className={styles.idCell}>{index + 1}</td>
                    <td>{rep.nombre}</td>
                    <td>{rep.referencia}</td>
                    <td>{rep.marca}</td>
                    <td>
                      <span className={styles.categoryBadge} data-category={categoryKey}>
                        {categoria}
                      </span>
                    </td>

                    <td className={styles.stockCell}>
                      <div className={styles.stockBlock}>
                        <div className={styles.stockHeader}>
                          <span className={styles.stockValue}>{stock}</span>

                          {rep.stockBajo && (
                            <div className={styles.tooltipContainer}>
                              <span className={styles.warning}>⚠</span>

                              <span className={styles.tooltip}>
                                Stock bajo <span className={styles.warning}>⚠</span> <br />
                                Recomendado mínimo: {rep.stockMinimo}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className={styles.stockBar}>
                          <span
                            className={`${styles.stockFill} ${rep.stockBajo ? styles.stockFillLow : styles.stockFillOk}`}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className={styles.priceCell}>{formatPrice(rep.precio)}</td>

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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}