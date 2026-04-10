import { apiFetch } from "../../../api/AuthApi";

export async function getRepuestos() {
    return await apiFetch('/repuestos', { method: 'GET' });
}

export async function getRepuestoById(id) {
    return await apiFetch(`/repuestos/${id}`, { method: 'GET' });
}

export async function createRepuesto(data) {
    return await apiFetch('/repuestos', {
        method: 'POST',
        body: data
    });
}

export async function updateRepuesto(id, data) {
    return await apiFetch(`/repuestos/${id}`, {
        method: 'PUT',
        body: data
    });
}

export async function deleteRepuesto(id) {
    return await apiFetch(`/repuestos/${id}`, {
        method: 'DELETE'
    });
}