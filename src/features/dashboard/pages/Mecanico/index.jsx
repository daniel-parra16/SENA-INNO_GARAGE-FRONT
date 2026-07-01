import {
    Wrench,
    Clock,
    Calendar,
    CheckCircle2,
    Car,
    User,
    ArrowRight
} from "lucide-react";

import styles from "../../styles/dashboard.module.css";
import { useAuth } from "../../../../store/authContext";
import useMecanicoDashboard from "../../hooks/useMecanicoDashboard";
import StatCard from "../../components/StatCard";

const STATUS = {
    CANCELADA: {
        label: "Cancelada",
        className: styles.danger
    },
    ENTREGADA: {
        label: "Entregada",
        className: styles.success
    },
    EN_PROCESO: {
        label: "En proceso",
        className: styles.warning
    },
    ASIGNADA: {
        label: "Asignada",
        className: styles.info
    }
};

export default function MecanicoDashboard() {

    const { user } = useAuth();

    const {
        dashboard,
        loading,
        error,
        reload
    } = useMecanicoDashboard(user?.numDoc);

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

    return (

        <div className={styles.dashboard}>

            <div className={styles.pageHeader}>

                <div>

                    <h1 className={styles.title}>
                        Bienvenido {user?.nombres}
                    </h1>

                    <p className={styles.subtitle}>
                        Hoy tienes {dashboard.ordenesAsignadas} órdenes asignadas.
                    </p>

                </div>

            </div>

            <div className={styles.statsSectionMecanico}>

                <StatCard
                    title="Asignadas"
                    value={dashboard.ordenesAsignadas}
                    icon={<Wrench size={22} />}
                    color="#2563eb"
                />

                <StatCard
                    title="En proceso"
                    value={dashboard.ordenesEnProceso}
                    icon={<Clock size={22} />}
                    color="#f59e0b"
                />

                <StatCard
                    title="Hoy"
                    value={dashboard.ordenesHoy}
                    icon={<Calendar size={22} />}
                    color="#7c3aed"
                />

                <StatCard
                    title="Terminadas"
                    value={dashboard.ordenesTerminadas}
                    icon={<CheckCircle2 size={22} />}
                    color="#16a34a"
                />

            </div>

            <div className={styles.ordersSection}>

                <h2 className={styles.sectionTitle}>
                    Mis órdenes
                </h2>

                <div className={styles.ordersGrid}>

                    {
                        dashboard.ordenes.map(orden => {

                            const status =
                                STATUS[orden.estado] || {
                                    label: orden.estado,
                                    className: styles.info
                                };

                            return (

                                <div
                                    key={orden.id}
                                    className={styles.orderCard}
                                >

                                    <div className={styles.orderTop}>

                                        <Car size={22} />

                                        <div>

                                            <h3>{orden.vehiculo}</h3>

                                            <p>
                                                {orden.tipo || "Mantenimiento"}
                                            </p>

                                        </div>

                                    </div>

                                    <div className={styles.orderInfo}>

                                        <div>

                                            <User size={16} />

                                            <span>
                                                {orden.cliente}
                                            </span>

                                        </div>

                                    </div>

                                    <div className={styles.orderFooter}>

                                        <span className={status.className}>
                                            {status.label}
                                        </span>

                                        <button>

                                            Ver orden

                                            <ArrowRight size={18} />

                                        </button>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}