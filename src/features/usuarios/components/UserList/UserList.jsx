import { Edit, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import styles from './UserList.module.css';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    }
    getUsers();
  }, []);

  console.log(users)
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
            {users.map((user, index) => (
              <tr key={user.idUsuario}>
                <td className={styles.idCell}>{index + 1}</td>
                <td className={styles.nameCell}>{user.nombre + ' ' + user.apellido}</td>
                <td>
                  {user.roles?.map(rol =>
                    rol.replace('ROLE_', '') // quitar prefijo
                      .toLowerCase()        // todo en minúscula
                      .replace(/^./, c => c.toUpperCase()) // primera mayúscula
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
