import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import styles from './InventarioList.module.css';

const ITEMS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(repuestos.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedRepuestos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return repuestos.slice(start, start + ITEMS_PER_PAGE);
  }, [repuestos, currentPage]);

  const firstItem = repuestos.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const lastItem = repuestos.length === 0 ? 0 : Math.min(currentPage * ITEMS_PER_PAGE, repuestos.length);

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    const normalizedStart = Math.max(1, end - maxVisible + 1);
    const length = end - normalizedStart + 1;

    return Array.from({ length }, (_, index) => normalizedStart + index);
  }, [currentPage, totalPages]);

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
              paginatedRepuestos.map((rep, index) => {
                const categoria =
                  rep.categoriaNombre ||
                  rep.nombreCategoria ||
                  (typeof rep.categoria === 'string' ? rep.categoria : rep.categoria?.nombre) ||
                  'Sin categoría';
                const categoryKey = normalizeCategory(categoria);
                const itemIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                const stock = Number(rep.stock) || 0;
                const stockPercent = Math.max(0, Math.min(100, Math.round((stock / maxStock) * 100)));

                // Para stock bajo: mostrar una porción roja visible y el resto de la pista
                // para representar capacidad faltante, aunque haya pocos registros en la tabla.
                const stockDisplayPercent = rep.stockBajo
                  ? (stock > 0 ? Math.min(35, Math.max(12, stockPercent)) : 6)
                  : (stock > 0 ? Math.max(10, stockPercent) : 0);

                return (
                  <tr key={rep.id ?? itemIndex}>
                    <td className={styles.idCell}>{itemIndex}</td>
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
                            style={{ width: `${stockDisplayPercent}%` }}
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

      {repuestos.length > 0 && (
        <div className={styles.paginationBar}>
          <p className={styles.paginationInfo}>
            Mostrando {firstItem}-{lastItem} de {repuestos.length}
          </p>

          <div className={styles.paginationControls}>
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {pageNumbers.map(page => (
              <button
                key={page}
                className={`${styles.paginationBtn} ${currentPage === page ? styles.paginationBtnActive : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}