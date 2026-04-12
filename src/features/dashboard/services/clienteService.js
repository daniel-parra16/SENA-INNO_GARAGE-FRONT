const FALLBACK_CLIENT_NAME = 'Juan Pérez';

export function getClienteDashboardFallback(clientName = FALLBACK_CLIENT_NAME) {
	return {
		clientName,
		stats: {
			totalVehiculos: 3,
			reparacionesActivas: 1,
			presupuestosAprobados: 12,
			totalInvertido: 4250,
		},
		vehicles: [
			{
				id: 'VEH-001',
				orderCode: 'ORD #AF-821',
				name: '2021 Tesla Model 3',
				service: 'Mantenimiento de frenos y revisión de batería',
				progress: 65,
				eta: 'Hoy, 5:00 PM',
				mechanic: 'Carlos M.',
				statusLabel: 'En Progreso',
				imageUrl: '',
			},
		],
		pendingQuotes: [
			{
				id: 'Q-5502',
				date: '12 May, 2024',
				description: 'Cambio de neumáticos (x4) Michelin Pilot',
				total: 1120,
				status: 'PENDIENTE',
			},
			{
				id: 'Q-5501',
				date: '10 May, 2024',
				description: 'Alineación y balanceo de llantas',
				total: 85,
				status: 'PENDIENTE',
			},
			{
				id: 'Q-5498',
				date: '07 May, 2024',
				description: 'Cambio de filtros y aceite sintético',
				total: 240,
				status: 'APROBADO',
			},
		],
		appointment: {
			title: 'Próximo Turno',
			date: '24 Mayo, 2024',
			time: '09:30 AM',
			branch: 'Sucursal Central',
			address: 'Av. Libertador 450, CABA',
		},
		trustedWorkshop: {
			name: 'AutoFix HQ',
			rating: 4.8,
			specialty: 'Especialistas en mantenimiento preventivo y eléctrico.',
			contact: '+57 314 000 1122',
		},
	};
}

function normalizeVehicle(vehicle, index) {
	return {
		id: vehicle.id ?? `VEH-${index + 1}`,
		orderCode: vehicle.orderCode ?? vehicle.ordenCodigo ?? `ORD #AF-${820 + index}`,
		name: vehicle.name ?? vehicle.nombre ?? vehicle.placa ?? 'Vehículo en taller',
		service: vehicle.service ?? vehicle.servicio ?? 'Mantenimiento general',
		progress: clampProgress(vehicle.progress ?? vehicle.progreso ?? 0),
		eta: vehicle.eta ?? vehicle.fechaEstimada ?? 'Por confirmar',
		mechanic: vehicle.mechanic ?? vehicle.mecanico ?? 'Sin asignar',
		statusLabel: vehicle.statusLabel ?? vehicle.estado ?? 'En Progreso',
		imageUrl: vehicle.imageUrl ?? vehicle.imagenUrl ?? '',
	};
}

function normalizeQuote(quote, index) {
	return {
		id: quote.id ?? quote.codigo ?? `Q-${5500 - index}`,
		date: quote.date ?? quote.fecha ?? 'Sin fecha',
		description: quote.description ?? quote.descripcion ?? 'Servicio sin descripción',
		total: Number(quote.total ?? quote.valor ?? 0),
		status: (quote.status ?? quote.estado ?? 'PENDIENTE').toUpperCase(),
	};
}

function clampProgress(progress) {
	const numericProgress = Number(progress);
	if (Number.isNaN(numericProgress)) return 0;
	return Math.max(0, Math.min(100, numericProgress));
}

export function normalizeClienteDashboard(payload, fallbackName = FALLBACK_CLIENT_NAME) {
	const fallback = getClienteDashboardFallback(fallbackName);

	if (!payload || typeof payload !== 'object') {
		return fallback;
	}

	const sourceVehicles = Array.isArray(payload.vehicles)
		? payload.vehicles
		: Array.isArray(payload.vehiculos)
			? payload.vehiculos
			: fallback.vehicles;

	const sourceQuotes = Array.isArray(payload.pendingQuotes)
		? payload.pendingQuotes
		: Array.isArray(payload.presupuestos)
			? payload.presupuestos
			: fallback.pendingQuotes;

	return {
		clientName:
			payload.clientName
			?? payload.cliente?.nombres
			?? payload.nombres
			?? fallback.clientName,
		stats: {
			totalVehiculos:
				Number(payload.stats?.totalVehiculos ?? payload.totalVehiculos ?? sourceVehicles.length),
			reparacionesActivas:
				Number(payload.stats?.reparacionesActivas ?? payload.reparacionesActivas ?? payload.ordenesEnCurso ?? 0),
			presupuestosAprobados:
				Number(payload.stats?.presupuestosAprobados ?? payload.presupuestosAprobados ?? payload.cotizacionesAprobadas ?? 0),
			totalInvertido:
				Number(payload.stats?.totalInvertido ?? payload.totalInvertido ?? payload.inversionTotal ?? 0),
		},
		vehicles: sourceVehicles.map(normalizeVehicle),
		pendingQuotes: sourceQuotes.map(normalizeQuote),
		appointment: {
			...fallback.appointment,
			...(payload.appointment ?? payload.proximaCita ?? {}),
		},
		trustedWorkshop: {
			...fallback.trustedWorkshop,
			...(payload.trustedWorkshop ?? payload.tallerConfianza ?? {}),
		},
	};
}
