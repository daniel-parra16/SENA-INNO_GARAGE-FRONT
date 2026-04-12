import { Edit, Eye, Trash2, Undo2 } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import styles from './UserList.module.css';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 10;

export default function UserList({ users, onUpdateUser, onDeleteUser }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(users.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(start, start + ITEMS_PER_PAGE);
  }, [users, currentPage]);

  const firstItem = users.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const lastItem = users.length === 0 ? 0 : Math.min(currentPage * ITEMS_PER_PAGE, users.length);

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    const normalizedStart = Math.max(1, end - maxVisible + 1);
    const length = end - normalizedStart + 1;

    return Array.from({ length }, (_, index) => normalizedStart + index);
  }, [currentPage, totalPages]);

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
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyCell}>
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => {
                const itemIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                return (
                  <tr key={user.id ?? user.correo ?? itemIndex}>
                    <td className={styles.idCell}>{itemIndex}</td>
                    <td className={styles.nameCell}>{user.nombre + ' ' + user.apellido}</td>
                    <td>
                      {user.roles?.map(rol =>
                        rol.replace('ROLE_', '')
                          .toLowerCase()
                          .replace(/^./, c => c.toUpperCase())
                      ).join(', ')}
                    </td>
                    <td>{user.correo}</td>
                    <td>{user.telefono}</td>
                    <td>
                      <StatusBadge status={user.status ? "Activo" : "Inactivo"} />
                    </td>
                    <td className={styles.lastLogin}>
                      {user.lastLogin && (
                        <>
                          <div>{user.lastLogin.split('T')[0]}</div>
                          <div>{user.lastLogin.split('T')[1].split('.')[0]}</div>
                        </>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionBtn} title="Ver detalles">
                          <Eye size={18} />
                        </button>
                        <button className={styles.actionBtn} title="Editar" onClick={() => onUpdateUser(user)}>
                          <Edit size={18} />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${user.status ? styles.actionBtnDanger : styles.actionBtnSuccess
                            }`}
                          title={user.status ? "Desactivar" : "Reactivar"}
                          onClick={() => onDeleteUser(user)}
                        >
                          {user.status ? <Trash2 size={18} /> : <Undo2 size={18} />}
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

      {users.length > 0 && (
        <div className={styles.paginationBar}>
          <p className={styles.paginationInfo}>
            Mostrando {firstItem}-{lastItem} de {users.length}
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
