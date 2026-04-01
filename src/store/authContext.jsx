import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Función auxiliar para decodificar el payload del JWT
function decodeJWT(token) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

// Mapea el rol del backend al nombre corto para el frontend
const roleMap = {
    ROLE_ADMIN: "admin",
    ROLE_MECANICO: "mecanico",
    ROLE_CLIENTE: "cliente",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Cargar sesión guardada al iniciar la app
    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            const payload = decodeJWT(parsed.accessToken);

            if (!payload) {
                localStorage.removeItem("auth");
                return;
            }

            // Verificar que el accessToken no haya expirado
            const now = Date.now() / 1000;
            if (payload.exp > now) {
                setUser(parsed);
            } else {
                localStorage.removeItem("auth");
            }
        } catch {
            localStorage.removeItem("auth");
        }
    }, []);

    // Login — recibe LoginResponse { accessToken, refreshToken, tipo }
    const login = (data) => {
        // Decodificar el accessToken para leer rol y nombre
        const payload = decodeJWT(data.accessToken);

        const userData = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tipo: data.tipo,
            // Leer directamente del payload del JWT
            nombres: payload?.nombres || "",
            rol: roleMap[payload?.roles?.[0]] || "cliente",
            id: payload?.sub || "",
        };

        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);