import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SearchBar } from '../../../components/ui/SearchBar/SearchBar';
import FormModal from '../../../components/ui/Modal/FormModal';
import InventarioForm from './InventarioForm/InventarioForm';
import styles from './InventarioFilters.module.css';

export default function InventarioFilters() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProduct = (data) => {
    console.log('Nuevo producto a crear:', data);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchGroup}>
        <SearchBar
          placeholder="Buscar producto..."
        />
      </div>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <select className={styles.select}>
            <option value="all">Todas las Categorías</option>
            <option value="electronics">Electrónica</option>
            <option value="hardware">Hardware</option>
          </select>
          <select className={styles.select}>
            <option value="all">Todos los Estados</option>
            <option value="in_stock">En Stock</option>
            <option value="low_stock">Bajo Stock</option>
            <option value="out_of_stock">Agotado</option>
          </select>
        </div>

        <button className={styles.newProductBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Añadir Nuevo Producto"
      >
        <InventarioForm onSubmit={handleCreateProduct} onCancel={() => setIsModalOpen(false)} />
      </FormModal>
    </div>
  );
}
