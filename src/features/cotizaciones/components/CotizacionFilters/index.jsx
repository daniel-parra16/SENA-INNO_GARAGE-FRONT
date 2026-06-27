import { useEffect, useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import styles from './CotizacionFilters.module.css';

export default function CotizacionFilters({ filters, onFilterChange, onNew }) {
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/cotizaciones/estadoCotizacion')
            .then((r) => r.json())
            .then(setEstados)
            .catch(() => { });
    }, []);

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
                    {estados.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                    ))}
                </select>
                <button
                    className={styles.resetBtn}
                    title="Limpiar filtros"
                    onClick={() => onFilterChange({ search: '', estado: 'all', agendamientoId: '', page: 0, size: 20 })}
                >
                    <RotateCcw size={16} />
                </button>
                <button className={styles.newBtn} onClick={onNew}>
                    <Plus size={16} />
                    Nueva cotización
                </button>
            </div>
        </div>
    );
}