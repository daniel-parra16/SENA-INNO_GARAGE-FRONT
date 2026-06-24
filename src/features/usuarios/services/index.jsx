import { apiFetch } from '../../../api/AuthApi';

// Servicio para traer todos los usuarios registrados
export async function getAllUsers() {
    return await apiFetch('/usuarios', {
        method: 'GET'
    })
}

// Servicio para crear un usuario
export async function createUser(data) {
    return await apiFetch('/usuarios', {
        method: 'POST',
        body: data,
    })
}

// Servicio para actualizar los datos de un usuario 
export async function updateUser(id, data) {
    return await apiFetch(`/usuarios/${id}`, {
        method: 'PUT',
        body: data
    })
}

// Servicio para desactivar un usuario 
export async function deleteUsers(id) {
    return await apiFetch(`/usuarios/${id}`, {
        method: 'DELETE'
    })
}

// Servicio para consultar los tipos de documentos
export async function getTipoDoc() {
    return await apiFetch('/usuarios/tipoDocumento')
}

// Servicio para consultar las especialidades mecánicas dinámicas
export async function getEspecialidadMecanico() {
    return await apiFetch('/usuarios/especialidadMecanico')
}

export async function getEspecialidades() {
    return await getEspecialidadMecanico();
}