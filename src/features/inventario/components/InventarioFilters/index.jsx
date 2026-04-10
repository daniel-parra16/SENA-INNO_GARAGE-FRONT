import { Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './InventarioFilters.module.css';

export default function InventarioFilters({ filters, onFilterChange, onNew }) {

  const handleSearch = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar por nombre, referencia o marca..."
          onChange={handleSearch}
        />

      </div>
      <div className={styles.actionGroup}>

        <button className={styles.newRepBtn} onClick={onNew}>
          <Plus size={18} />
          Nuevo Repuesto
        </button>
      </div>


    </div>
  );
}