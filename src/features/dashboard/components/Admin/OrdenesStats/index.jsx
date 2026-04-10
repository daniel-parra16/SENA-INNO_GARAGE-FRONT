import { StatCard } from "../../Common/StatCard";

export function OrdenesStats({ data }) {
    return (
        <>
            <StatCard title="Órdenes Totales" value={data.totalOrdenes} />
            <StatCard title="En Proceso" value={data.enProceso} />
            <StatCard title="Terminadas" value={data.terminadas} />
        </>
    );
}