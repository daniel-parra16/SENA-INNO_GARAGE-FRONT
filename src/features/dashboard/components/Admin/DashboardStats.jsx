import {

    Clock3,

    Wrench,

    FileText,

    Car,

    Package,

    Users

} from "lucide-react";

import StatCard from "../StatCard";
import styles from "../../styles/dashboard.module.css";
export default function DashboardStats({ data }) {

    const cards = [

        {

            title: "Órdenes pendientes",

            value: data.ordenesPendientes,

            icon: <Clock3 size={24} />,

            color: "#f59e0b"

        },

        {

            title: "En proceso",

            value: data.ordenesProceso,

            icon: <Wrench size={24} />,

            color: "#3b82f6"

        },

        {

            title: "Cotizaciones",

            value: data.cotizacionesPendientes,

            icon: <FileText size={24} />,

            color: "#8b5cf6"

        },

        {

            title: "Vehículos",

            value: data.vehiculosEnTaller,

            icon: <Car size={24} />,

            color: "#22c55e"

        },

        {

            title: "Stock bajo",

            value: data.stockBajo,

            icon: <Package size={24} />,

            color: "#ef4444"

        },

        {

            title: "Mecánicos",

            value: data.mecanicos,

            icon: <Users size={24} />,

            color: "#06b6d4"

        }

    ];

    return (

        <>

            {

                cards.map((card, index) => (

                    <StatCard

                        key={index}

                        {...card}

                    />

                ))

            }

        </>

    );

}