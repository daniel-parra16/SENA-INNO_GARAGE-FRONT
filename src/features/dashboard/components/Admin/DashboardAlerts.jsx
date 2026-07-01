import {

    AlertTriangle,

    CheckCircle2,

    Info

} from "lucide-react";

import styles from "../../styles/dashboard.module.css";
export default function DashboardAlerts({ data }) {

    const getIcon = (tipo) => {

        switch (tipo) {

            case "error":

            case "warning":

                return <AlertTriangle size={18} />

            case "success":

                return <CheckCircle2 size={18} />

            default:

                return <Info size={18} />

        }

    }

    return (

        <div className={styles.container}>

            <h2>

                Alertas

            </h2>

            {

                data.length === 0 ?

                    (

                        <p>

                            No existen alertas.

                        </p>

                    )

                    :

                    (

                        data.map((alert, index) => (

                            <div

                                key={index}

                                className={`${styles.alert} ${styles[alert.tipo]}`}

                            >

                                {getIcon(alert.tipo)}

                                <div>

                                    <strong>

                                        {alert.titulo}

                                    </strong>

                                    <p>

                                        {alert.descripcion}

                                    </p>

                                </div>

                            </div>

                        ))

                    )

            }

        </div>

    );

}