import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SearchBar } from '../../../../components/ui/SearchBar/SearchBar';
import FormModal from '../../../../components/ui/Modal/FormModal';
import CotizacionForm from '../CotizacionForm/CotizacionForm';
import styles from './CotizacionesFilters.module.css';

export default function CotizacionesFilters() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCotizacion = (data) => {
    console.log('Nueva cotización a crear:', data);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchBox}>
        <SearchBar
          placeholder="Buscar cotizaciones por ID, cliente..."
        />
      </div>

      <div className={styles.actionGroup}>
        <button className={styles.newCotizacionBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Nueva Cotización
        </button>
      </div>

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Crear Nueva Cotización"
      >
        <CotizacionForm onSubmit={handleCreateCotizacion} onCancel={() => setIsModalOpen(false)} />
      </FormModal>
    </div>
  );
}