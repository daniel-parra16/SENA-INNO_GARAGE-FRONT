import {

    Car,

    Truck,

    Wrench,

    BadgeDollarSign

} from "lucide-react";

import ActivityCard from "./ActivityCard";

import styles from "../../styles/dashboard.module.css";

export default function TodayActivity({ data }) {

    const cards = [

        {

            title: "Ingresos",

            value: data.ingresosHoy,

            icon: <Car size={26} />,

            color: "#3b82f6"

        },

        {

            title: "Entregas",

            value: data.entregasHoy,

            icon: <Truck size={26} />,

            color: "#22c55e"

        },

        {

            title: "Reparaciones",

            value: data.reparacionesActivas,

            icon: <Wrench size={26} />,

            color: "#f59e0b"

        },

        {

            title: "Cotizaciones aprobadas",

            value: data.cotizacionesAprobadasHoy,

            icon: <BadgeDollarSign size={26} />,

            color: "#8b5cf6"

        }

    ];

    return (

        <div className={styles.container}>

            <h2>

                Actividad de hoy

            </h2>

            <div className={styles.grid}>

                {

                    cards.map((card, index) => (

                        <ActivityCard

                            key={index}

                            {...card}

                        />

                    ))

                }

            </div>

        </div>

    );

}