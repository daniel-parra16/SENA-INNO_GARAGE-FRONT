import {
	CarFront,
	Clock3,
	UserRound,
} from 'lucide-react';

import styles from './MyVehicles.module.css';

function ProgressBar({ progress }) {
	return (
		<div className={styles.progressTrack}>
			<div
				className={styles.progressFill}
				style={{ width: `${Math.max(0, Math.min(100, Number(progress) || 0))}%` }}
			/>
		</div>
	);
}

export default function MyVehicles({ vehicles }) {
	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h2>Mis Vehículos en el Taller</h2>
				<button className={styles.linkButton} type="button">
					Ver todos
				</button>
			</header>

			<div className={styles.list}>
				{vehicles.map((vehicle) => (
					<article key={vehicle.id} className={styles.card}>
						<div className={styles.mediaWrap}>
							{vehicle.imageUrl ? (
								<img
									src={vehicle.imageUrl}
									alt={vehicle.name}
									className={styles.image}
								/>
							) : (
								<div className={styles.placeholder}>
									<CarFront size={52} />
								</div>
							)}
						</div>

						<div className={styles.content}>
							<div className={styles.topLine}>
								<span className={styles.orderCode}>{vehicle.orderCode}</span>
								<span className={styles.statusPill}>{vehicle.statusLabel}</span>
							</div>

							<h3>{vehicle.name}</h3>
							<p className={styles.service}>{vehicle.service}</p>

							<div className={styles.progressMeta}>
								<span>Progreso de la reparación</span>
								<strong>{vehicle.progress}%</strong>
							</div>

							<ProgressBar progress={vehicle.progress} />

							<div className={styles.footerMeta}>
								<span>
									<Clock3 size={14} />
									Estimado: {vehicle.eta}
								</span>

								<span>
									<UserRound size={14} />
									Mecánico: {vehicle.mechanic}
								</span>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
