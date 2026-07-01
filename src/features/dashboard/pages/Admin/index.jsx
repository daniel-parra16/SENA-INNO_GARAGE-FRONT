import styles from "../../styles/dashboard.module.css";
import useAdminDashboard from "../../hooks/useAdminDashboard";

import DashboardHeader from "../../components/Admin/DashboardHeader";
import DashboardStats from "../../components/Admin/DashboardStats";
import DashboardAlerts from "../../components/Admin/DashboardAlerts";
import PriorityJobs from "../../components/Admin/PriorityJobs";
import TodayActivity from "../../components/Admin/TodayActivity";

export default function AdminDashboard() {

    const {

        dashboard,

        loading,

        error,

        reload

    } = useAdminDashboard();

    if (loading) {

        return <p>Cargando dashboard...</p>;

    }

    if (error) {

        return (

            <div>

                <p>{error}</p>

                <button onClick={reload}>

                    Reintentar

                </button>

            </div>

        );

    }

    return (

        <div className={styles.dashboard}>

            {/* Header */}

            <DashboardHeader

                data={dashboard.resumen}

            />

            {/* Estadísticas */}

            <section className={styles.statsSection}>

                <DashboardStats

                    data={dashboard.estadisticas}

                />

            </section>

            {/* Contenido principal */}

            <section className={styles.contentSection}>

                <div className={styles.leftColumn}>

                    <PriorityJobs

                        data={dashboard.trabajosPrioritarios}

                    />

                </div>

                <aside className={styles.rightColumn}>

                    <DashboardAlerts

                        data={dashboard.alertas}

                    />

                </aside>

            </section>

            {/* Actividad */}

            <section className={styles.activitySection}>

                <TodayActivity

                    data={dashboard.actividadHoy}

                />

            </section>

        </div>

    );

}