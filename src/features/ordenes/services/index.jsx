import { apiFetch } from '../../../api/AuthApi';

// 🔥 Obtener paginado
export async function getAllOrdenes(params = {}) {
    const query = new URLSearchParams(params).toString();

    return await apiFetch(`/ordenes?${query}`, {
        method: 'GET'
    });
}

// 🔥 Crear
export async function createOrden(data) {
    return await apiFetch('/ordenes', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

// 🔥 Actualizar
export async function updateOrden(id, data) {
    return await apiFetch(`/ordenes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

// 🔥 Cambiar estado
export async function changeEstado(id, estado) {
    return await apiFetch(`/ordenes/${id}/estado`, {
        method: 'PATCH',
        body: JSON.stringify({ estado })
    });
}

// 🔥 Convertir cotización → orden
export async function convertToOrden(id) {
    return await apiFetch(`/ordenes/${id}/convertir`, {
        method: 'PATCH'
    });
}

// 🔥 Eliminar (soft delete)
export async function deleteOrden(id) {
    return await apiFetch(`/ordenes/${id}`, {
        method: 'DELETE'
    });
}