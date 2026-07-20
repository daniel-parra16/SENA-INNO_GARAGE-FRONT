import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './OrdenFilters.module.css';
import { getEstadosOrden } from '../../services';

export default function OrdenFilters({ filters, onFilterChange }) {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    getEstadosOrden().then(setEstados).catch(() => { });
  }, []);

  const handleSearchChange = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleEstadoChange = (e) => {
    onFilterChange({ ...filters, estado: e.target.value });
  };

  const handleResetFilters = () => {
    onFilterChange({ search: '', estado: 'all', page: 0, size: 20 });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar por cliente, vehículo o descripción..."
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.actionGroup}>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.estado}
            onChange={handleEstadoChange}
          >
            <option value="all">Todos los estados</option>
            {estados.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className={styles.resetBtn}
          title="Limpiar filtros"
          onClick={handleResetFilters}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}