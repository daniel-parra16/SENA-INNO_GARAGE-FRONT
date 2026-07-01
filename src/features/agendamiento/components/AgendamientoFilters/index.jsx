import { useEffect, useState } from 'react';
import { Plus, RotateCcw, Search } from 'lucide-react';
import styles from './AgendamientoFilters.module.css';
import { getTiposEstado } from '../../services';

export default function AgendamientoFilters({ filters, onFilterChange, onNew }) {
    const [estados, setEstados] = useState([]);
    const [localSearch, setLocalSearch] = useState(filters.search);

    useEffect(() => {
        setLocalSearch(filters.search);
    }, [filters.search]);

    useEffect(() => {
        const loadEstados = async () => {
            try {
                const data = await getTiposEstado();
                setEstados(data || []);
            } catch (err) {
                console.error('Error cargando estados', err);
            }
        };

        loadEstados();
    }, []);

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.searchGroup}>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Buscar por cliente, vehículo o estado..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                />
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.searchBtn}
                    title="Buscar"
                    onClick={() =>
                        onFilterChange({
                            ...filters,
                            search: localSearch,
                            page: 0
                        })
                    }
                >
                    <Search size={16} />
                </button>

                <button
                    className={styles.resetBtn}
                    title="Limpiar filtros"
                    onClick={() =>
                        onFilterChange({ ...filters, search: '', estado: 'all', page: 0 })
                    }
                >
                    <RotateCcw size={16} />
                </button>

                <select
                    className={styles.select}
                    value={filters.estado}
                    onChange={(e) =>
                        onFilterChange({ ...filters, estado: e.target.value, page: 0 })
                    }
                >
                    <option value="all">Todos los estados</option>

                    {estados.map((e) => (
                        <option key={e.value} value={e.value}>
                            {e.label}
                        </option>
                    ))}
                </select>

                <button className={styles.newBtn} onClick={onNew}>
                    <Plus size={16} />
                    Nuevo agendamiento
                </button>
            </div>
        </div>
    );
}