import { useCallback, useEffect, useState } from "react";

import { getAdminDashboard } from "../services";

export default function useAdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const response = await getAdminDashboard();

            setDashboard(response);

        } catch (err) {

            console.error(err);

            setError("No fue posible cargar el dashboard.");

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    return {

        dashboard,

        loading,

        error,

        reload: loadDashboard

    };

}