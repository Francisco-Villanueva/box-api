export const PACAKGE_STATUSES = [
	'PENDIENTE',
	'EN CURSO',
	'NO ASIGNADO',
	'ENTREGADO',
]
export type PackageStatus = (typeof PACAKGE_STATUSES)[number]
