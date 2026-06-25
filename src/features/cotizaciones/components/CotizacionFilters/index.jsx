import { RotateCcw } from 'lucide-react';
import styles from './CotizacionFilters.module.css';

export default function CotizacionFilters({ filters, onFilterChange }) {
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.searchBox}>
                <input
                    className={styles.searchInput}
                    type="text"
                    value={filters.search}
                    placeholder="Buscar por cliente, vehículo o descripción..."
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                />
            </div>
            <div className={styles.actions}>
                <select
                    className={styles.select}
                    value={filters.estado}
                    onChange={(e) => onFilterChange({ ...filters, estado: e.target.value })}
                >
                    <option value="all">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="APROBADA">Aprobada</option>
                    <option value="RECHAZADA">Rechazada</option>
                    <option value="ORDEN_RECIBIDO">Orden recibido</option>
                </select>
                <input
                    className={styles.searchInput}
                    type="text"
                    value={filters.agendamientoId}
                    placeholder="ID agendamiento"
                    onChange={(e) => onFilterChange({ ...filters, agendamientoId: e.target.value })}
                />
                <button className={styles.resetBtn} onClick={() => onFilterChange({ ...filters, search: '', estado: 'all', agendamientoId: '' })}>
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    );
}
