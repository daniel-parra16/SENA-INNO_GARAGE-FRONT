import { Filter, Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './UserFilters.module.css';

export default function UserFilters() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar 
          placeholder="Buscar por ID, nombre o rol..."
        />
      </div>

      <div className={styles.actionGroup}>
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select className={styles.select}>
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <button className={styles.newUserBtn}>
          <Plus size={18} />
          Nuevo Usuario
        </button>
      </div>
    </div>
  );
}
