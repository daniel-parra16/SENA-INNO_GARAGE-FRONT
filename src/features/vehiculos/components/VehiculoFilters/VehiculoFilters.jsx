import { Filter, Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './VehiculoFilters.module.css';

export default function VehiculoFilters({ filters, onFilterChange, onNew }) {

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
                    placeholder="Buscar por propietario, placa o marca..."
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

                <button className={styles.newVehiculoBtn} onClick={onNew}>
                    <Plus size={18} />
                    Nuevo Vehículo
                </button>
            </div>
        </div>
    );
}