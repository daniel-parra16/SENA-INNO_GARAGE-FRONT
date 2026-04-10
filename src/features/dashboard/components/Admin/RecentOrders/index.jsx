import styles from './RecentOrders.module.css';

export function RecentOrders() {

    const fakeOrders = [
        { id: '1', cliente: 'Juan Pérez', placa: 'ABC123', estado: 'EN_PROCESO' },
        { id: '2', cliente: 'Ana López', placa: 'XYZ987', estado: 'PENDIENTE' },
    ];

    return (
        <div className={styles.container}>
            <h3>Últimas Órdenes</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Placa</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.cliente}</td>
                            <td>{order.placa}</td>
                            <td>{order.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}