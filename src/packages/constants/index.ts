export const PACAKGE_STATUSES = [
	'PENDIENTE',
	'EN CURSO',
	'unassigned',
	'ENTREGADO',
]
export type PackageStatus = (typeof PACAKGE_STATUSES)[number]
