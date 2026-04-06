import { apiFetch } from '../../../api/AuthApi';

export async function createUser(data) {
    return await apiFetch('/usuarios', {
        method: 'POST',
        body: data,
    })
}

export async function getAllUsers() {
    return await apiFetch('/usuarios', {
        method: 'GET'
    })
}