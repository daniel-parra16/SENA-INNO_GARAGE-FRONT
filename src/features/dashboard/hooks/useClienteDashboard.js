import { useCallback, useEffect, useState } from "react";

import { getClienteDashboard } from "../services";

export default function useClienteDashboard(documento) {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadDashboard = useCallback(async () => {

        if (!documento) return;

        try {

            setLoading(true);

            setError(null);

            const response = await getClienteDashboard(documento);

            setDashboard(response);

        } catch (err) {

            console.error(err);

            setError("No fue posible cargar el dashboard.");

        } finally {

            setLoading(false);

        }

    }, [documento]);

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