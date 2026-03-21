import { Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import styles from './CotizacionesFilters.module.css';

export default function CotizacionesFilters() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar cotizaciones por ID, cliente..."
        />
      </div>

      <div className={styles.actionGroup}>
        <button className={styles.newCotizacionBtn}>
          <Plus size={18} />
          Nueva Cotización
        </button>
      </div>
    </div>
  );
}