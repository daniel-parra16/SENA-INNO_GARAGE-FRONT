import { apiFetch } from '../../../api/AuthApi';

// Obtener usuarios para asignar cotizacion/orden
export async function getAllSimpleUsers() {
    return await apiFetch('usuarios/getUsuarios', {
        method: 'GET'
    });
}

// Obtener mecanicos para asignar cotizacion/orden
export async function getAllSimpleMecanicos() {
    return await apiFetch('usuarios/getMecanicos', {
        method: 'GET'
    });
}

// Obtener el vehiculo del usuario
export async function getAllVehicleByNumDoc(numDoc) {
    return await apiFetch(`/vehiculos/getVehiculosUser/${numDoc}`, {
        method: 'GET'
    })

}

//  Obtener paginado
export async function getAllOrdenes(params = {}) {
    const query = new URLSearchParams(params).toString();

    return await apiFetch(`/ordenes?${query}`, {
        method: 'GET'
    });
}

//  Crear
export async function createOrden(data) {
    return await apiFetch('/ordenes', {
        method: 'POST',
        body: data
    });
}

//  Actualizar
export async function updateOrden(id, data) {
    return await apiFetch(`/ordenes/${id}`, {
        method: 'PUT',
        body: data
    });
}

//  Cambiar estado
export async function changeEstado(id, estado) {
    return await apiFetch(`/ordenes/${id}/estado`, {
        method: 'PATCH',
        body: { estado }
    });
}

//  Convertir cotización → orden
export async function convertToOrden(id) {
    return await apiFetch(`/ordenes/${id}/convertir`, {
        method: 'PATCH'
    });
}

//  Eliminar (soft delete)
export async function deleteOrden(id) {
    return await apiFetch(`/ordenes/${id}`, {
        method: 'DELETE'
    });
}

// Obtener repuestos para items de la orden
export async function getAllRepuestos() {
    return await apiFetch('/repuestos', {
        method: 'GET'
    });
}

// Cambiar estado con refresh
export async function changeEstadoOrden(id, estado) {
    return await apiFetch(`/ordenes/${id}/estado`, {
        method: 'PATCH',
        body: { estado }
    });
}