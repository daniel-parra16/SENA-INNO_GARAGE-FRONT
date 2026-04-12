import {
	Car,
	Wrench,
	CircleCheckBig,
	Wallet,
} from 'lucide-react';

import styles from './ClienteStats.module.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

const statsConfig = [
	{
		key: 'totalVehiculos',
		title: 'TOTAL',
		subtitle: 'Mis Vehículos',
		icon: Car,
		iconColor: '#3b82f6',
		iconBg: 'rgba(59, 130, 246, 0.15)',
	},
	{
		key: 'reparacionesActivas',
		title: 'EN CURSO',
		subtitle: 'Reparaciones Activas',
		icon: Wrench,
		iconColor: '#f59e0b',
		iconBg: 'rgba(245, 158, 11, 0.15)',
	},
	{
		key: 'presupuestosAprobados',
		title: 'APROBADOS',
		subtitle: 'Presupuestos',
		icon: CircleCheckBig,
		iconColor: '#22c55e',
		iconBg: 'rgba(34, 197, 94, 0.15)',
	},
	{
		key: 'totalInvertido',
		title: 'HISTÓRICO',
		subtitle: 'Total Invertido',
		icon: Wallet,
		iconColor: '#38bdf8',
		iconBg: 'rgba(56, 189, 248, 0.15)',
	},
];

function formatValue(key, value) {
	if (key === 'totalInvertido') {
		return currencyFormatter.format(Number(value) || 0);
	}
	return Number(value) || 0;
}

export default function ClienteStats({ stats }) {
	return (
		<section className={styles.grid}>
			{statsConfig.map((item) => {
				const Icon = item.icon;

				return (
					<article key={item.key} className={styles.card}>
						<div className={styles.cardHeader}>
							<div
								className={styles.iconWrap}
								style={{
									color: item.iconColor,
									backgroundColor: item.iconBg,
								}}
							>
								<Icon size={18} />
							</div>
							<span className={styles.label}>{item.title}</span>
						</div>

						<p className={styles.value}>{formatValue(item.key, stats?.[item.key])}</p>
						<p className={styles.subtitle}>{item.subtitle}</p>
					</article>
				);
			})}
		</section>
	);
}
