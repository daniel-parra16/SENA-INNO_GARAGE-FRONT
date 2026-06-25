import { apiFetch } from '../../api/AuthApi';

export async function getAllAgendamientos(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiFetch(`/agendamientos?${query}`, { method: 'GET' });
}

export async function createAgendamiento(data) {
    return await apiFetch('/agendamientos', { method: 'POST', body: data });
}

export async function updateAgendamiento(id, data) {
    return await apiFetch(`/agendamientos/${id}`, { method: 'PUT', body: data });
}

export async function changeAgendamientoLlegada(id) {
    return await apiFetch(`/agendamientos/${id}/llegada`, { method: 'PATCH' });
}

export async function deleteAgendamiento(id) {
    return await apiFetch(`/agendamientos/${id}`, { method: 'DELETE' });
}
