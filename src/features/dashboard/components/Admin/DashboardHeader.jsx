import styles from "../../styles/dashboard.module.css";
export default function DashboardHeader({ data }) {

    const fecha = new Date(data.ultimaActualizacion);

    return (

        <div className={styles.container}>

            <div>

                <h1 className={styles.title}>
                    {data.saludo}, {data.nombreAdministrador}
                </h1>

                <p className={styles.subtitle}>
                    Bienvenido nuevamente al panel administrativo.
                </p>

            </div>

            <div className={styles.info}>

                <div className={styles.item}>
                    <span className={styles.label}>Vehículos en taller</span>
                    <span className={styles.value}>
                        {data.vehiculosEnTaller}
                    </span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Pendientes</span>
                    <span className={styles.value}>
                        {data.ordenesPendientes}
                    </span>
                </div>

                <div className={styles.updated}>
                    Actualizado

                    {fecha.toLocaleString()}
                </div>

            </div>

        </div>

    );

}