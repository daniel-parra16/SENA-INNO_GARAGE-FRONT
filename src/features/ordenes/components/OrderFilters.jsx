import { Filter, Plus, Search } from 'lucide-react';
import styles from './OrderFilters.module.css';

export default function OrderFilters() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <Search className={styles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Buscar por ID, vehículo o cliente..." 
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.actionGroup}>
        <div className={styles.filterSelect}>
          <Filter size={16} />
          <select className={styles.select}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="in_progress">En Progreso</option>
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
