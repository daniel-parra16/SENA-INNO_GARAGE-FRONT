import { apiFetch } from '../../../api/api';

// Servicio para registrar usuario
export async function registerUser(payload) {
	// payload: {documentType, documentNumber, nombres, apellidos, phone, email, password}
	return apiFetch('/auth/register', {
		method: 'POST',
		body: payload
	});
}
