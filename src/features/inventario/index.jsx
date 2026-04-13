import { useEffect, useState } from 'react';
import styles from './InventarioView.module.css';

import InventarioFilters from './components/InventarioFilters';
import { InventarioList } from './components/InventarioList';
import InventarioStatCard from './components/InventarioStatCard';
import { InventarioFormModal } from './components/InventarioForm';

import FormModal from '../../components/ui/Modal/FormModal';
import LoadingModal from '../../components/ui/LoadingModal/LoadingModal';
import Modal from '../../components/ui/Modal/modal';
import ConfirmModal from '../../components/ui/ConfirmModal/ConfirmModal';

import { useInventario } from './hooks';
import { useSearchParams } from 'react-router-dom';

export default function InventarioView() {
  const {
    repuestos,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
    fetchRepuestos
  } = useInventario();

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const [searchParams] = useSearchParams();

  const mapStockFromParams = (stock) => {
    switch (stock) {
      case 'bajo':
        return 'low';
      case 'normal':
        return 'normal';
      default:
        return 'all';
    }
  };

  const getInitialFilters = () => {
    const stockParam = searchParams.get('stock');

    return {
      search: '',
      stock: stockParam
        ? mapStockFromParams(stockParam)
        : 'all'
    };
  };

  const [filters, setFilters] = useState(getInitialFilters);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('info');
  const [showModal, setShowModal] = useState(false);

  // 📊 STATS
  const stats = [
    {
      id: 1,
      title: 'Total Repuestos',
      value: repuestos.length,
      type: 'total',
      action: () => setFilters(prev => ({ ...prev, stock: 'all' }))
    },
    {
      id: 2,
      title: 'Stock Bajo',
      value: repuestos.filter(r => r.stockBajo).length,
      type: 'warning',
      action: () => setFilters(prev => ({ ...prev, stock: 'low' }))
    },
    {
      id: 3,
      title: 'Stock Total',
      value: repuestos.reduce((acc, r) => acc + (r.stock || 0), 0),
      type: 'active',
      action: () => setFilters(prev => ({ ...prev, stock: 'normal' }))
    }
  ];

  // 🔍 FILTRO
  const filtered = repuestos.filter(r => {

    // 🔍 BUSCADOR
    const searchMatch =
      r.nombre?.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.referencia?.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.marca?.toLowerCase().includes(filters.search.toLowerCase());

    // 📦 FILTRO STOCK
    const stockMatch =
      filters.stock === 'all' ||
      (filters.stock === 'low' && r.stockBajo) ||
      (filters.stock === 'normal' && !r.stockBajo);

    return searchMatch && stockMatch;
  });

  // 💾 GUARDAR
  const handleSave = async (data) => {
    if (!data) return;

    try {
      if (selected) {
        await handleUpdate(selected.id, data);
        setMessage("Repuesto actualizado correctamente");
      } else {
        await handleCreate(data);
        setMessage("Repuesto creado correctamente");
      }

      setTitle("Success");
      setType("success");
      setShowModal(true);

      await fetchRepuestos();

    } catch (err) {
      setTitle("Error");
      setType("error");
      setMessage(err.message);
      setShowModal(true);
    }

    setOpenModal(false);
    setSelected(null);
  };

  // 🗑 ELIMINAR
  const handleAskDelete = (item) => {
    setSelectedItem(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return; // 🔥 PROTECCIÓN

    await handleDelete(selectedItem.id);

    setConfirmOpen(false);
    setSelectedItem(null); // 🔥 limpiar estado
    fetchRepuestos();
  };

  return (
    <>
      {loading && <LoadingModal mensaje="Procesando..." />}

      {showModal && (
        <Modal
          title={title}
          message={message}
          onClose={() => setShowModal(false)}
          type={type}
        />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title="Eliminar repuesto"
        message={
          selectedItem
            ? `¿Deseas eliminar ${selectedItem.nombre}?`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedItem(null);
        }}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gestión de Inventario</h1>
          <p className={styles.subtitle}>
            Administra los repuestos del taller
          </p>
        </div>

        {/* 📊 CARDS */}
        <div className={styles.statsGrid}>
          {stats.map(stat => (
            <InventarioStatCard key={stat.id} {...stat} onClick={stat.action} />
          ))}
        </div>

        {/* 🔍 FILTROS */}
        <InventarioFilters
          filters={filters}
          onFilterChange={setFilters}
          onNew={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        />

        {/* 📋 LISTA */}
        <InventarioList
          repuestos={filtered}
          onEdit={(rep) => {
            setSelected(rep);
            setOpenModal(true);
          }}
          onDelete={handleAskDelete}
        />

        {/* 🧾 MODAL */}
        {openModal && (
          <FormModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            title={selected ? "Editar Repuesto" : "Nuevo Repuesto"}
          >
            <InventarioFormModal
              initialData={selected}
              onSave={handleSave}
              onClose={() => setOpenModal(false)}
            />
          </FormModal>
        )}
      </div>
    </>
  );
}