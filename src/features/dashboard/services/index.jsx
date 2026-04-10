import { apiFetch } from "../../../api/AuthApi";

export async function getAdminDashboard() {
    return await apiFetch('/dashboard/admin');
}

export async function getMecanicoDashboard(id) {
    return await apiFetch(`/dashboard/mecanico/${id}`);
}

export async function getClienteDashboard(doc) {
    return await apiFetch(`/dashboard/cliente/${doc}`);
}