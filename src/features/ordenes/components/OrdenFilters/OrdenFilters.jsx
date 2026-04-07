import { Filter, Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './OrdenFilters.module.css';

export default function OrdenFilters({ onNew, filters, onFilterChange }) {

  const handleSearchChange = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleEstadoChange = (e) => {
    onFilterChange({ ...filters, estado: e.target.value });
  };

  const handleTipoChange = (e) => {
    onFilterChange({ ...filters, tipo: e.target.value });
  };

  return (
    <div className={styles.filtersContainer}>

      {/* 🔍 BUSCADOR */}
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar por cliente, vehículo o descripción..."
          onChange={handleSearchChange}
        />
      </div>

      {/* 🔘 FILTROS + BOTÓN */}
      <div className={styles.actionGroup}>

        {/* 🔥 FILTRO ESTADO */}
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select
            className={styles.select}
            value={filters.estado}
            onChange={handleEstadoChange}
          >
            <option value="all">Todos los estados</option>
            <option value="COTIZACION_PENDIENTE">Pendiente</option>
            <option value="COTIZACION_APROBADA">Aprobada</option>
            <option value="ORDEN_EN_REPARACION">En proceso</option>
            <option value="ORDEN_FINALIZADA">Finalizada</option>
          </select>
        </div>

        {/* 🔥 FILTRO TIPO */}
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select
            className={styles.select}
            value={filters.tipo}
            onChange={handleTipoChange}
          >
            <option value="all">Todos los tipos</option>
            <option value="COTIZACION">Cotización</option>
            <option value="ORDEN">Orden</option>
          </select>
        </div>

        {/* ➕ NUEVO */}
        <button className={styles.newOrderBtn} onClick={onNew}>
          <Plus size={18} />
          Nueva Orden
        </button>

      </div>
    </div>
  );
}