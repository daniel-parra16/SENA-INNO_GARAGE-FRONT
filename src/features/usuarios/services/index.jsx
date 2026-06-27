import { apiFetch } from '../../../api/AuthApi';

// GET /usuarios → List<UsuarioDto> (array directo)
export async function getAllUsers() {
    const data = await apiFetch('/usuarios', { method: 'GET' });
    return Array.isArray(data) ? data : [];
}

// GET /usuarios/{numDoc} → UsuarioDto
export async function getUserByDoc(numDoc) {
    return await apiFetch(`/usuarios/${numDoc}`, { method: 'GET' });
}

// POST /usuarios → { mensaje, id }
// Body: CrearUsuarioRequest
export async function createUser(data) {
    return await apiFetch('/usuarios', {
        method: 'POST',
        body: data,
    });
}

// PUT /usuarios/{numDoc} → UsuarioDto actualizado
// Body: EditarUsuarioRequest
export async function updateUser(numDoc, data) {
    return await apiFetch(`/usuarios/${numDoc}`, {
        method: 'PUT',
        body: data,
    });
}

// DELETE /usuarios/{numDoc} → 204 No Content (soft delete: activo=false)
export async function deleteUser(numDoc) {
    return await apiFetch(`/usuarios/${numDoc}`, { method: 'DELETE' });
}

// GET /usuarios/tipoDocumento → [{ value, label }]
export async function getTipoDoc() {
    return await apiFetch('/usuarios/tipoDocumento');
}

// GET /usuarios/tipoVia → [{ value, label }]
export async function getTipoVia() {
    return await apiFetch('/usuarios/tipoVia');
}

// GET /usuarios/especialidadMecanico → [{ value, label }]
export async function getEspecialidadMecanico() {
    return await apiFetch('/usuarios/especialidadMecanico');
}

// GET /usuarios/getUsuarios → [{ numeroDocumento, nombreCompleto }]
export async function getUsuariosSimples() {
    return await apiFetch('/usuarios/getUsuarios');
}

// GET /usuarios/getMecanicos → [{ numeroDocumento, nombreCompleto }]
export async function getMecanicosSimples() {
    return await apiFetch('/usuarios/getMecanicos');
}