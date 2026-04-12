import { useEffect, useMemo, useState } from 'react';

import styles from './ClienteDashboard.module.css';
import { useAuth } from '../../../../store/authContext';
import { getClienteDashboard } from '../../services';
import {
    getClienteDashboardFallback,
    normalizeClienteDashboard,
} from '../../services/clienteService';

import ClienteStats from '../../components/Cliente/ClienteStats';
import MyVehicles from '../../components/Cliente/MyVehicles';
import MyOrders from '../../components/Cliente/MyOrders';
import OrderStatus from '../../components/Cliente/OrderStatus';

export default function ClienteDashboard() {
    const { user } = useAuth();

    const firstName = useMemo(() => {
        if (!user?.nombres) return 'Juan';
        return user.nombres.split(' ')[0];
    }, [user?.nombres]);

    const [data, setData] = useState(() => getClienteDashboardFallback(user?.nombres || 'Juan Pérez'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(getClienteDashboardFallback(user?.nombres || 'Juan Pérez'));
    }, [user?.nombres]);

    useEffect(() => {
        let isMounted = true;

        const loadDashboard = async () => {
            if (isMounted) setLoading(true);

            if (!user?.id) {
                if (isMounted) setLoading(false);
                return;
            }

            try {
                const response = await getClienteDashboard(user.id);
                if (isMounted) {
                    setData(normalizeClienteDashboard(response, user?.nombres || 'Juan Pérez'));
                }
            } catch (error) {
                console.error('No se pudo cargar el dashboard de cliente, usando datos de respaldo.', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadDashboard();

        return () => {
            isMounted = false;
        };
    }, [user?.id, user?.nombres]);

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hola, {firstName}</h1>
                <p className={styles.subtitle}>
                    {loading
                        ? 'Preparando tu panel de control...'
                        : 'Bienvenido de nuevo a tu panel de AutoFix Pro.'}
                </p>
            </header>

            <ClienteStats stats={data.stats} />

            <div className={styles.contentGrid}>
                <div className={styles.leftColumn}>
                    <MyVehicles vehicles={data.vehicles} />
                    <MyOrders quotes={data.pendingQuotes} />
                </div>

                <aside className={styles.rightColumn}>
                    <OrderStatus
                        appointment={data.appointment}
                        trustedWorkshop={data.trustedWorkshop}
                    />
                </aside>
            </div>
        </section>
    );
}
