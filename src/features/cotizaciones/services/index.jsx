import { apiFetch } from '../../api/AuthApi';

export async function getAllCotizaciones(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiFetch(`/cotizaciones?${query}`, { method: 'GET' });
}

export async function deleteCotizacion(id) {
    return await apiFetch(`/cotizaciones/${id}`, { method: 'DELETE' });
}
