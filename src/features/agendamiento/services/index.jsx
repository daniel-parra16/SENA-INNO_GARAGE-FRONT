import { apiFetch } from "../../../api/AuthApi";


// GET /usuarios/tipoVia → [{ value, label }]
export async function getTiposEstado() {
    return await apiFetch('/agendamientos/estadoAgendamiento');
}

export async function getAllAgendamientos(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await apiFetch(`/agendamientos?${query}`, { method: 'GET' });
}

export async function getAgendamientosByUser() {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (!auth?.numDoc) {
        throw new Error("No hay un usuario autenticado.");
    }

    return await apiFetch(`/agendamientos/user/${auth.numDoc}`, {
        method: "GET",
    });
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

export async function changeAgendamientoEstado(id, estado) {
    return await apiFetch(`/agendamientos/${id}/estado`, {
        method: 'PATCH',
        body: { estado }
    });
}