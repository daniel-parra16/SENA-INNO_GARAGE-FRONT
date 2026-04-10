import { StatCard } from "../../Common/StatCard";

export function VehiculosStats({ data }) {
    return (
        <>
            <StatCard title="Vehículos Registrados" value={data.totalVehiculos} />
        </>
    );
}