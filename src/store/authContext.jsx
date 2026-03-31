import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Cargar sesión guardada al iniciar la app
    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                // Verificar que el accessToken no haya expirado
                const payload = JSON.parse(atob(parsed.accessToken.split(".")[1]));
                const now = Date.now() / 1000;

                if (payload.exp > now) {
                    setUser(parsed);
                } else {
                    localStorage.removeItem("auth");
                }
            } catch {
                localStorage.removeItem("auth");
            }
        }
    }, []);

    // Login — recibe exactamente el LoginResponse del backend
    const login = (data) => {
        // Mapea el rol del backend al nombre corto para el frontend
        const roleMap = {
            ROLE_ADMIN: "admin",
            ROLE_MECANICO: "mecanico",
            ROLE_CLIENTE: "cliente",
        };

        const userData = {
            nombres: data.nombres,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tipo: data.tipo,
            rol: roleMap[data.rol] || "cliente",
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