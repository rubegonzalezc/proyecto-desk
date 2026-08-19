import type { TicketPriority, TicketStatus } from '@/shared/types/ticket'

export function getStatusDisplayLabel(status: TicketStatus | 'Todos', compact = false): string {
  if (!compact) return status
  if (status === 'En progreso') return 'Progreso'
  return status
}

export function getPriorityDisplayLabel(priority: TicketPriority, compact = false): string {
  if (compact && priority === 'Crítica') return 'Crít.'
  return priority
}
