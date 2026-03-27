import { apiFetch } from '../../../api/AuthApi';

// Servicio para registrar usuario
export async function registerUser(payload) {
	return apiFetch('/auth/registro', {
		method: 'POST',
		body: payload
	});
}
