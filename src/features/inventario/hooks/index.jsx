import { useEffect, useState } from 'react';
import {
    getRepuestos,
    createRepuesto,
    updateRepuesto,
    deleteRepuesto
} from '../services';

export function useInventario() {
    const [repuestos, setRepuestos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRepuestos = async () => {
        setLoading(true);
        const data = await getRepuestos();
        setRepuestos(data || []);
        setLoading(false);
    };

    const handleCreate = async (data) => {
        await createRepuesto(data);
        fetchRepuestos();
    };

    const handleUpdate = async (id, data) => {
        await updateRepuesto(id, data);
        fetchRepuestos();
    };

    const handleDelete = async (id) => {
        await deleteRepuesto(id);
        fetchRepuestos();
    };

    useEffect(() => {
        fetchRepuestos();
    }, []);

    return {
        repuestos,
        loading,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchRepuestos
    };
}