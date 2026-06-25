import { Filter, Plus, RotateCcw } from 'lucide-react';
import styles from './AgendamientoFilters.module.css';

export default function AgendamientoFilters({ filters, onFilterChange, onNew }) {
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.searchGroup}>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Buscar por cliente, vehículo o estado..."
                    value={filters.search}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                />
            </div>
            <div className={styles.actions}>
                <button className={styles.resetBtn} onClick={() => onFilterChange({ ...filters, search: '', estado: 'all' })}>
                    <RotateCcw size={16} />
                </button>
                <select
                    className={styles.select}
                    value={filters.estado}
                    onChange={(e) => onFilterChange({ ...filters, estado: e.target.value })}
                >
                    <option value="all">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="APROBADA">Aprobada</option>
                    <option value="RECHAZADA">Rechazada</option>
                    <option value="SE_PRESENTA">Se presenta</option>
                </select>
                <button className={styles.newBtn} onClick={onNew}>
                    <Plus size={16} />
                    Nuevo agendamiento
                </button>
            </div>
        </div>
    );
}
