import { useCallback, useEffect, useState } from "react";

import { getMecanicoDashboard } from "../services";

export default function useMecanicoDashboard(mecanicoId) {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadDashboard = useCallback(async () => {

        if (!mecanicoId) return;

        try {

            setLoading(true);

            setError(null);

            const response = await getMecanicoDashboard(mecanicoId);

            setDashboard(response);

        } catch (err) {

            console.error(err);

            setError("No fue posible cargar el dashboard.");

        } finally {

            setLoading(false);

        }

    }, [mecanicoId]);

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