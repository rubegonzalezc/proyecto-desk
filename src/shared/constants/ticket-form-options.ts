import type { TicketPriority, TicketStatus } from '@/shared/types/ticket'
import { getUsersSeedSync } from '@/lib/api/users'
import { filterByTenant } from '@/shared/mock/tenant-scope'

export const TICKET_CATEGORIES = [
  'Conectividad',
  'Hardware',
  'Correo',
  'Acceso remoto',
  'Solicitud',
  'Seguridad',
  'Licencias',
] as const

export const TICKET_STATUSES: TicketStatus[] = [
  'Nuevo',
  'En progreso',
  'Pendiente',
  'Resuelto',
  'Cerrado',
]

export const TICKET_PRIORITIES: TicketPriority[] = ['Baja', 'Media', 'Alta', 'Crítica']

export function getTechnicianOptions(tenantId: string): string[] {
  const names = filterByTenant(getUsersSeedSync(), tenantId).map((user) => user.name)
  return ['Sin asignar', ...names]
}
