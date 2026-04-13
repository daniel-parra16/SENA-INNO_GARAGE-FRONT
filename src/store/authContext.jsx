import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function decodeJWT(token) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

const roleMap = {
    ROLE_ADMIN: "admin",
    ROLE_MECANICO: "mecanico",
    ROLE_CLIENTE: "cliente",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);

    // Cargar sesión guardada al iniciar la app
    useEffect(() => {
        const stored = localStorage.getItem("auth");

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const payload = decodeJWT(parsed.accessToken);

                if (!payload) {
                    localStorage.removeItem("auth");
                } else {
                    const now = Date.now() / 1000;
                    if (payload.exp > now) {
                        setUser(parsed);
                    } else {
                        localStorage.removeItem("auth");
                    }
                }
            } catch {
                localStorage.removeItem("auth");
            }
        }

        // ✅ El listener se registra SIEMPRE, independiente de si hay sesión
        const handleExpired = () => setSessionExpired(true);
        window.addEventListener("session-expired", handleExpired);
        return () => window.removeEventListener("session-expired", handleExpired);
    }, []);

    const login = (data) => {
        const payload = decodeJWT(data.accessToken);
        const userData = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tipo: data.tipo,
            nombres: payload?.nombres || "",
            rol: roleMap[payload?.roles?.[0]] || "cliente",
            id: payload?.sub || "",
        };
        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
        setSessionExpired(false);
    };

    const logout = () => {
        setUser(null);
        setSessionExpired(false); // ← limpiar también al hacer logout manual
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, sessionExpired, setSessionExpired }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);