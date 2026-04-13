const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function buildUrl(endpoint) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  const text = await response.text();
  return text ? { message: text } : null;
}

async function refreshAccessToken() {
  const stored = localStorage.getItem("auth");
  if (!stored) return null;

  const { refreshToken } = JSON.parse(stored);
  if (!refreshToken) return null;

  try {
    const response = await fetch(buildUrl('/auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      // Refresh token vencido — limpiar sesión y notificar
      localStorage.removeItem("auth");
      // Disparar evento global para que el front muestre el mensaje
      window.dispatchEvent(new CustomEvent("session-expired"));
      return null;
    }

    const data = await response.json();
    const parsed = JSON.parse(localStorage.getItem("auth"));
    const updated = {
      ...parsed,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };
    localStorage.setItem("auth", JSON.stringify(updated));
    return data.accessToken;

  } catch {
    localStorage.removeItem("auth");
    window.dispatchEvent(new CustomEvent("session-expired"));
    return null;
  }
}

export async function apiFetch(endpoint, options = {}) {
  const url = buildUrl(endpoint);
  const { body, headers, ...restOptions } = options;

  const stored = localStorage.getItem("auth");
  const accessToken = stored ? JSON.parse(stored).accessToken : null;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  // Token vencido — intentar renovar y reintentar
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return;

    const retryResponse = await fetch(url, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newToken}`,
        ...(headers || {})
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const retryData = await parseResponse(retryResponse);

    if (!retryResponse.ok) {
      throw {
        status: retryResponse.status,
        message: retryData?.message || `Error HTTP ${retryResponse.status}`,
        errores: retryData?.errores || null
      };
    }

    return retryData;
  }

  // Sin permisos — lanzar error con mensaje del back
  if (response.status === 403) {
    const data = await parseResponse(response);
    throw {
      status: 403,
      message: data?.message || "No tienes permisos para realizar esta acción",
      errores: null
    };
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || `Error HTTP ${response.status}`,
      errores: data?.errores || null
    };
  }

  return data;
}