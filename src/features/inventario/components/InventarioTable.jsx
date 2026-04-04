import { Edit2, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge/StatusBadge';
import styles from './InventarioTable.module.css';

export default function InventarioTable() {
  const products = [
    { 
      id: 1, 
      sku: 'PRD-001', 
      name: 'Laptop HP ProBook', 
      category: 'Electrónica',
      stock: 45,
      price: '$850.00',
      status: 'En Stock'
    },
    { 
      id: 2, 
      sku: 'PRD-002', 
      name: 'Monitor Dell 24"', 
      category: 'Periféricos',
      stock: 8,
      price: '$210.00',
      status: 'Bajo Stock'
    },
    { 
      id: 3, 
      sku: 'PRD-003', 
      name: 'Teclado Mecánico', 
      category: 'Accesorios',
      stock: 0,
      price: '$45.00',
      status: 'Agotado'
    },
    { 
      id: 4, 
      sku: 'PRD-004', 
      name: 'Mouse Inalámbrico', 
      category: 'Accesorios',
      stock: 120,
      price: '$25.00',
      status: 'En Stock'
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className={styles.idCell}>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock} unds</td>
                <td className={styles.totalCell}>{product.price}</td>
                <td>
                  <StatusBadge status={product.status} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Ver">
                      <Eye size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.actionDelete}`} title="Eliminar">
                      <Trash2 size={18} />
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
