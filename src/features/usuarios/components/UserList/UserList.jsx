import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import styles from './UserList.module.css';

const MOCK_USERS = [
  { id: 'USR-001', name: 'Carlos Ruiz', role: 'Administrador', email: 'carlos.ruiz@autofix.com', status: 'Activo', lastLogin: 'Hace 2 horas' },
  { id: 'USR-002', name: 'Ana Mendez', role: 'Mecánico', email: 'ana.mendez@autofix.com', status: 'Activo', lastLogin: 'Hace 5 horas' },
  { id: 'USR-003', name: 'Luis Fonsi', role: 'Mecánico', email: 'luis.fonsi@autofix.com', status: 'Inactivo', lastLogin: 'Hace 2 días' },
  { id: 'USR-004', name: 'Rosa Pineda', role: 'Recepcionista', email: 'rosa.pineda@autofix.com', status: 'Activo', lastLogin: 'Hace 1 hora' },
];

export default function UserList() {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td className={styles.idCell}>{user.id}</td>
                <td className={styles.nameCell}>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionBtn} title="Ver detalles">
                      <Eye size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Editar">
                      <Edit size={18} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Eliminar">
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
