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