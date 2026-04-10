import styles from './AlertsPanel.module.css';

export function AlertsPanel({ data }) {

    const alerts = [];

    if (data.stockBajo > 0) {
        alerts.push({
            type: 'warning',
            message: `Hay ${data.stockBajo} repuestos con stock bajo`
        });
    }

    if (data.ordenesPendientes > 0) {
        alerts.push({
            type: 'info',
            message: `${data.ordenesPendientes} órdenes pendientes por atender`
        });
    }

    if (data.cotizacionesPendientes > 0) {
        alerts.push({
            type: 'warning',
            message: `${data.cotizacionesPendientes} cotizaciones sin respuesta`
        });
    }

    if (alerts.length === 0) {
        alerts.push({
            type: 'success',
            message: 'Todo está al día 🚀'
        });
    }

    return (
        <div className={styles.container}>
            <h3>Alertas</h3>

            {alerts.map((alert, i) => (
                <div key={i} className={`${styles.alert} ${styles[alert.type]}`}>
                    {alert.message}
                </div>
            ))}
        </div>
    );
}