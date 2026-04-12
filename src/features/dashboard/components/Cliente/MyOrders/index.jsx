import { CircleCheckBig, Eye } from 'lucide-react';

import styles from './MyOrders.module.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
});

export default function MyOrders({ quotes }) {
	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h2>Presupuestos Pendientes</h2>
			</header>

			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>ID</th>
							<th>FECHA</th>
							<th>DESCRIPCIÓN</th>
							<th>TOTAL</th>
							<th>ACCIONES</th>
						</tr>
					</thead>

					<tbody>
						{quotes.map((quote) => {
							const isPending = quote.status === 'PENDIENTE';

							return (
								<tr key={quote.id}>
									<td className={styles.quoteId}>{quote.id}</td>
									<td>{quote.date}</td>
									<td className={styles.description}>{quote.description}</td>
									<td className={styles.total}>
										{currencyFormatter.format(Number(quote.total) || 0)}
									</td>
									<td>
										<div className={styles.actions}>
											<button type="button" className={styles.detailButton}>
												<Eye size={14} />
												Ver Detalle
											</button>

											<button
												type="button"
												className={`${styles.approveButton} ${!isPending ? styles.disabled : ''}`}
												disabled={!isPending}
											>
												<CircleCheckBig size={14} />
												{isPending ? 'Aprobar' : 'Aprobado'}
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
}
