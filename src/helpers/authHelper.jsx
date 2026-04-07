export const getUserIdFromToken = () => {
    const token = localStorage.getItem("auth");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload?.sub; // 👈 aquí está el usuarioId
    } catch (error) {
        console.error("Error decoding token", error);
        return null;
    }
};