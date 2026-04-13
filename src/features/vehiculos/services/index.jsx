import { apiFetch } from '../../../api/AuthApi';
import { getUserIdFromToken } from '../../../helpers/authHelper';
// 🔥 Obtener todos
export async function getAllVehiculos() {
    return await apiFetch('/vehiculos', {
        method: 'GET'
    });
}

// 🔥 Crear
export async function createVehiculo(data) {
    const userId = getUserIdFromToken();

    const payload = {
        ...data,
        registrado_por: userId
    };

    return await apiFetch('/vehiculos', {
        method: 'POST',
        body: payload
    });
}

// 🔥 Actualizar
export async function updateVehiculo(placa, data) {
    const userId = getUserIdFromToken();

    const payload = {
        ...data,
        actualizado_por: userId

    };

    return await apiFetch(`/vehiculos/${placa}`, {
        method: 'PUT',
        body: payload
    });
}

export async function deleteVehiculo(placa) {
    return await apiFetch(`/vehiculos/${placa}`, {
        method: 'DELETE'
    });
}

export async function getAllSimpleUsers() {
    return await apiFetch('/usuarios/getUsuarios')
}