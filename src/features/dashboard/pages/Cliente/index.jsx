import {
    FileText,
    Wrench,
    CheckCircle2,
    Car,
    ArrowRight
} from "lucide-react";

import styles from "../../styles/dashboard.module.css";
import { useAuth } from "../../../../store/authContext";
import useClienteDashboard from "../../hooks/useClienteDashboard";
import StatCard from "../../components/StatCard";

export default function ClienteDashboard() {

    const { user } = useAuth();

    const {
        dashboard,
        loading,
        error,
        reload
    } = useClienteDashboard(user?.numDoc);

    if (loading)
        return <div className={styles.loading}>Cargando...</div>;

    if (error)
        return (
            <div className={styles.errorPage}>
                <h2>{error}</h2>

                <button
                    className={styles.primaryButton}
                    onClick={reload}
                >
                    Reintentar
                </button>

            </div>
        );

    if (!dashboard)
        return null;

    const {
        cotizacionesPendientes,
        ordenesActivas,
        ordenesFinalizadas,
        vehiculos
    } = dashboard;

    return (

        <div className={styles.dashboard}>

            <div className={styles.pageHeader}>

                <div>

                    <h1 className={styles.title}>
                        Hola, {user?.nombres}
                    </h1>

                    <p className={styles.subtitle}>
                        {ordenesActivas > 0
                            ? `Tienes ${ordenesActivas} ${ordenesActivas === 1 ? "orden activa" : "órdenes activas"} en este momento.`
                            : "No tienes órdenes activas en este momento."}
                    </p>

                </div>

            </div>

            <div className={styles.statsSectionMecanico}>

                <StatCard
                    title="Vehículos"
                    value={vehiculos}
                    description="Registrados a tu nombre"
                    icon={<Car size={22} />}
                    color="#2563eb"
                />

                <StatCard
                    title="Cotizaciones pendientes"
                    value={cotizacionesPendientes}
                    description="Esperando tu aprobación"
                    icon={<FileText size={22} />}
                    color="#f59e0b"
                />

                <StatCard
                    title="Órdenes activas"
                    value={ordenesActivas}
                    description="En proceso actualmente"
                    icon={<Wrench size={22} />}
                    color="#7c3aed"
                />

                <StatCard
                    title="Órdenes finalizadas"
                    value={ordenesFinalizadas}
                    description="Servicios completados"
                    icon={<CheckCircle2 size={22} />}
                    color="#16a34a"
                />

            </div>

            {/* CTA destacado para cotizaciones pendientes */}
            {cotizacionesPendientes > 0 && (

                <div className={styles.clienteAlertCard}>

                    <div className={styles.clienteAlertIcon}>
                        <FileText size={26} />
                    </div>

                    <div className={styles.clienteAlertText}>

                        <h3>
                            Tienes {cotizacionesPendientes} {cotizacionesPendientes === 1 ? "cotización pendiente" : "cotizaciones pendientes"}
                        </h3>

                        <p>
                            Revísalas y apruébalas para que iniciemos el trabajo en tu vehículo.
                        </p>

                    </div>

                    <button className={styles.clienteAlertButton}>
                        Ver cotizaciones
                        <ArrowRight size={18} />
                    </button>

                </div>

            )}

            {/* Estado vacío llamativo cuando no hay actividad */}
            {ordenesActivas === 0 && cotizacionesPendientes === 0 && (

                <div className={styles.clienteEmptyCard}>

                    <CheckCircle2 size={48} />

                    <h3>Todo al día</h3>

                    <p>
                        No tienes cotizaciones pendientes ni órdenes en proceso. Cuando agendes un nuevo servicio, aparecerá aquí.
                    </p>

                </div>

            )}

        </div>

    );

}