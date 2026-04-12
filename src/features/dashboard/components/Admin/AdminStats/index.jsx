// components/admin/AdminStats.jsx
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../StatCard';

import {
    Users,
    Wrench,
    ClipboardList,
    Clock,
    CheckCircle,
    AlertTriangle,
    Car,
    Package
} from 'lucide-react';

export function AdminStats({ data }) {

    const navigate = useNavigate();

    const cards = [
        {
            title: "Usuarios",
            value: data.usuarios,
            icon: <Users size={24} />,
            color: '#3b82f6',
            action: () => navigate('/usuarios')
        },
        {
            title: "Mecánicos",
            value: data.mecanicos,
            icon: <Wrench size={24} />,
            color: '#eab308',
            action: () => navigate('/usuarios?rol=MECANICO')
        },
        {
            title: "Órdenes Pendientes",
            value: data.ordenesPendientes,
            icon: <Clock size={24} />,
            color: '#ef4444',
            action: () => navigate('/ordenes?estado=PENDIENTE')
        },
        {
            title: "Órdenes en Proceso",
            value: data.ordenesProceso,
            icon: <ClipboardList size={24} />,
            color: '#22c55e',
            action: () => navigate('/ordenes?estado=EN_PROCESO')
        },
        {
            title: "Órdenes Finalizadas",
            value: data.ordenesFinalizadas,
            icon: <CheckCircle size={24} />,
            color: '#22c55e',
            action: () => navigate('/ordenes?estado=FINALIZADA')
        },
        {
            title: "Cotizaciones Pendientes",
            value: data.cotizacionesPendientes,
            icon: <AlertTriangle size={24} />,
            color: '#ef4444',
            action: () => navigate('/ordenes?tipo=COTIZACION&estado=PENDIENTE')
        },
        {
            title: "Vehículos en Taller",
            value: data.vehiculosEnTaller,
            icon: <Car size={24} />,
            color: '#eab308',
            action: () => navigate('/vehiculos?estado=EN_TALLER')
        },
        {
            title: "Stock Bajo",
            value: data.stockBajo,
            icon: <Package size={24} />,
            color: '#ef4444',
            action: () => navigate('/inventario?stock=bajo')
        }
    ];

    return (
        <>
            {cards.map((card, index) => (
                <StatCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    color={card.color}
                    onClick={card.action}
                />
            ))}
        </>
    );
}