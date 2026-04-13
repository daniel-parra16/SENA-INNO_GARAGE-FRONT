import { Plus, Filter } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './InventarioFilters.module.css';

export default function InventarioFilters({ filters, onFilterChange, onNew }) {

  const handleSearch = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleStockChange = (e) => {
    onFilterChange({ ...filters, stock: e.target.value });
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

        {/* 🔥 FILTRO STOCK */}
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select
            className={styles.select}
            value={filters.stock}
            onChange={handleStockChange}
          >
            <option value="all">Todos</option>
            <option value="low">Stock bajo</option>
            <option value="normal">Stock normal</option>
          </select>
        </div>

        {/* ➕ NUEVO */}
        <button className={styles.newRepBtn} onClick={onNew}>
          <Plus size={18} />
          Nuevo Repuesto
        </button>

      </div>

    </div>
  );
}