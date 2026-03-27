import { apiFetch } from '../../../api/AuthApi';

// Servicio para registrar usuario
export async function registerUser(payload) {
	return apiFetch('/auth/registro', {
		method: 'POST',
		body: payload
	});
}
// Servicio para iniciar sesion del usuario
export async function loginUser(payload) {
	return apiFetch('/auth/login', {
		method: 'POST',
		body: payload
	});
}
