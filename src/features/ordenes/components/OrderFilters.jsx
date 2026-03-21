import { Filter, Plus } from 'lucide-react';
import { SearchBar } from '../../../components/ui/SearchBar/SearchBar';
import styles from './OrderFilters.module.css';

export default function OrderFilters() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar 
          placeholder="Buscar por ID, vehículo o cliente..." 
        />
      </div>

      <div className={styles.actionGroup}>
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select className={styles.select}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="in_progress">En Proceso</option>
            <option value="completed">Completados</option>
          </select>
        </div>
        
        <button className={styles.newOrderBtn}>
          <Plus size={18} />
          Nueva Orden
        </button>
      </div>
    </div>
  );
}
