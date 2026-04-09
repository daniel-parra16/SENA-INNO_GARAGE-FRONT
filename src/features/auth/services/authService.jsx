import { apiFetch } from '../../../api/AuthApi';

// Servicio para registrar usuario
export async function registerUser(data) {
    return await apiFetch('/auth/registro', {
        method: 'POST',
        body: data
    });
}

// Servicio para iniciar sesion del usuario
export async function loginUser(data) {
    return await apiFetch('/auth/login', {
        method: 'POST',
        body: data
    });
}

// Refresh token — renueva el accessToken usando el refreshToken
export async function refreshToken(refreshToken) {
    return await apiFetch('/auth/refresh', {
        method: 'POST',
        body: { refreshToken }
    });
}

// Logout — invalida la sesión en el backend
export async function logoutUser(refreshToken) {
    return await apiFetch('/auth/logout', {
        method: 'POST',
        body: { refreshToken }
    });
}

// Servicio para verificar el correo con el token de la URL
export async function verificarCorreo(codigo, numeroDocumento) {
    return await apiFetch('/auth/verificar-correo', {
        method: 'POST',
        body: { codigo, numeroDocumento }
    });
}

// Solicitar recuperación de contraseña
export async function solicitarRecuperacion(correo) {
    return await apiFetch('/auth/recuperar-password', {
        method: 'POST',
        body: { correo }
    });
}

// Restablecer contraseña con token
export async function restablecerPassword(data) {
    return await apiFetch('/auth/nueva-password', {
        method: 'POST',
        body: data
    });
}

// Servicio para consultar los tipos de documentos
export async function getTipoDoc() {
    return await apiFetch('/auth/tipoDocumento')
}