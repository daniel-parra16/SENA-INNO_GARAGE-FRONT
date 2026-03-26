import { createContext, useContext, useEffect, useState } from "react";

// Creamos el contexto
export const AuthContext = createContext();

// Provider (envuelve toda la app)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Cargar sesión al iniciar la app
    useEffect(() => {
        const stored = localStorage.getItem("auth");

        if (stored) {
            const parsed = JSON.parse(stored);

            try {
                // Decodificar token JWT
                const payload = JSON.parse(atob(parsed.token.split(".")[1]));
                const now = Date.now() / 1000;

                // Validar expiración
                if (payload.exp > now) {
                    setUser(parsed);
                } else {
                    localStorage.removeItem("auth"); // token expirado
                }
            } catch (error) {
                localStorage.removeItem("auth"); // token inválido
            }
        }
    }, []);

    // Login
    const login = (data) => {
        const roleMap = {
            ROLE_Admin: "admin",
            ROLE_Mecanico: "mecanico",
            ROLE_Cliente: "cliente",
        };

        const roleRaw = data.roles?.[0];

        const userData = {
            username: data.usuario,
            token: data.token,
            role: roleMap[roleRaw] || "cliente",
        };

        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
    };

    // 🚪 Logout
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

// Hook personalizado (forma PRO de usar el contexto)
export const useAuth = () => useContext(AuthContext);