import {
	CalendarDays,
	MapPin,
	Star,
	Wrench,
	Phone,
} from 'lucide-react';

import styles from './OrderStatus.module.css';

function Rating({ value }) {
	const rounded = Math.round(value);

	return (
		<div className={styles.rating}>
			{Array.from({ length: 5 }).map((_, index) => (
				<Star
					key={index}
					size={14}
					className={index < rounded ? styles.starActive : styles.starInactive}
				/>
			))}
			<span>{value.toFixed(1)}</span>
		</div>
	);
}

export default function OrderStatus({ appointment, trustedWorkshop }) {
	return (
		<div className={styles.stack}>
			<section className={styles.card}>
				<header className={styles.sectionHeader}>
					<h3>Citas Próximas</h3>
				</header>

				<article className={styles.appointmentCard}>
					<div className={styles.titleRow}>
						<CalendarDays size={16} />
						<span>{appointment.title}</span>
					</div>

					<div className={styles.dateBox}>
						<span>FECHA Y HORA</span>
						<strong>{appointment.date}</strong>
						<p>{appointment.time}</p>
					</div>

					<div className={styles.branchInfo}>
						<MapPin size={15} />
						<div>
							<h4>{appointment.branch}</h4>
							<p>{appointment.address}</p>
						</div>
					</div>

					<button type="button" className={styles.primaryButton}>
						Gestionar Cita
					</button>
				</article>
			</section>

			<section className={styles.card}>
				<header className={styles.sectionHeader}>
					<h3>Taller de Confianza</h3>
				</header>

				<article className={styles.workshopCard}>
					<div className={styles.workshopTop}>
						<div className={styles.workshopIcon}>
							<Wrench size={18} />
						</div>

						<div>
							<h4>{trustedWorkshop.name}</h4>
							<Rating value={Number(trustedWorkshop.rating) || 0} />
						</div>
					</div>

					<p className={styles.specialty}>{trustedWorkshop.specialty}</p>

					<div className={styles.contact}>
						<Phone size={14} />
						{trustedWorkshop.contact}
					</div>
				</article>
			</section>
		</div>
	);
}
