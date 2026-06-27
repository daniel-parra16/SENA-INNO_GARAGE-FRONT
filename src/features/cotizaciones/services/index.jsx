import { apiFetch } from "../../../api/AuthApi";

export async function getAllCotizaciones(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiFetch(`/cotizaciones?${query}`, { method: 'GET' });
}

export async function getCotizacionById(id) {
    return await apiFetch(`/cotizaciones/${id}`, { method: 'GET' });
}

export async function createCotizacion(data) {
    return await apiFetch('/cotizaciones', { method: 'POST', body: data });
}

export async function updateCotizacion(id, data) {
    return await apiFetch(`/cotizaciones/${id}`, { method: 'PUT', body: data });
}

export async function cambiarEstadoCotizacion(id, estado) {
    return await apiFetch(`/cotizaciones/${id}/estado`, { method: 'PATCH', body: { estado } });
}

export async function deleteCotizacion(id) {
    return await apiFetch(`/cotizaciones/${id}`, { method: 'DELETE' });
}

export async function getEstadosCotizacion() {
    return await apiFetch('/cotizaciones/estadoCotizacion', { method: 'GET' });
}