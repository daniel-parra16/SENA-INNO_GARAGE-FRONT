import { Filter, Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './UserFilters.module.css';

export default function UserFilters({ onOpenNewUser, filters, onFilterChange }) {

  const handleSearchChange = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar por nombre, correo o rol..."
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.actionGroup}>
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select
            className={styles.select}
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <button className={styles.newUserBtn} onClick={onOpenNewUser}>
          <Plus size={18} />
          Nuevo Usuario
        </button>
      </div>
    </div>
  );
}