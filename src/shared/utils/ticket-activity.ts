import type { Ticket, TicketActivity, TicketActivityKind, TicketComment } from '@/shared/types/ticket'
import { formatTicketTimestamp, parseTicketTimestamp } from '@/shared/utils/ticket-timestamps'

const ACTIVITY_LABELS: Record<TicketActivityKind, string> = {
  creado: 'Creado',
  asignado: 'Asignado',
  cambio_estado: 'Cambio de estado',
  comentario: 'Comentario',
  resuelto: 'Resuelto',
}

export function getTicketActivityLabel(kind: TicketActivityKind): string {
  return ACTIVITY_LABELS[kind]
}

export function parseTicketActivityTimestamp(value: string): number {
  return parseTicketTimestamp(value)
}

export function sortTicketActivityDesc(events: TicketActivity[]): TicketActivity[] {
  return [...events].sort(
    (left, right) => parseTicketActivityTimestamp(right.at) - parseTicketActivityTimestamp(left.at),
  )
}

function nextActivityId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function buildTicketActivity(
  kind: TicketActivityKind,
  message: string,
  options: {
    at?: string
    actor?: string
    id?: string
    meta?: TicketActivity['meta']
  } = {},
): TicketActivity {
  return {
    id: options.id ?? nextActivityId(kind),
    kind,
    at: options.at ?? formatTicketTimestamp(),
    actor: options.actor,
    message,
    meta: options.meta,
  }
}

export function synthesizeTicketActivity(ticket: Ticket): TicketActivity[] {
  const events: TicketActivity[] = [
    buildTicketActivity('creado', `Ticket registrado por ${ticket.requester}`, {
      id: `${ticket.id}-created`,
      at: ticket.createdAt,
      actor: ticket.requester,
    }),
  ]

  if (ticket.technician !== 'Sin asignar') {
    events.push(
      buildTicketActivity('asignado', `Asignado a ${ticket.technician}`, {
        id: `${ticket.id}-assigned`,
        at: ticket.createdAt,
        actor: 'Sistema',
        meta: { to: ticket.technician },
      }),
    )
  }

  for (const comment of ticket.comments) {
    events.push(commentToActivity(ticket.id, comment))
  }

  if (ticket.status === 'Resuelto') {
    events.push(
      buildTicketActivity('resuelto', 'Ticket marcado como resuelto', {
        id: `${ticket.id}-resolved`,
        at: ticket.updatedAt,
        actor: ticket.technician !== 'Sin asignar' ? ticket.technician : undefined,
        meta: { to: ticket.status },
      }),
    )
  } else if (ticket.status !== 'Nuevo') {
    events.push(
      buildTicketActivity('cambio_estado', `Estado actualizado a ${ticket.status}`, {
        id: `${ticket.id}-status`,
        at: ticket.updatedAt,
        actor: ticket.technician !== 'Sin asignar' ? ticket.technician : undefined,
        meta: { to: ticket.status },
      }),
    )
  }

  return sortTicketActivityDesc(events)
}

export function ensureTicketActivity(ticket: Ticket): Ticket {
  if (ticket.activity?.length) {
    return { ...ticket, activity: sortTicketActivityDesc(ticket.activity) }
  }
  return { ...ticket, activity: synthesizeTicketActivity(ticket) }
}

export function commentToActivity(ticketId: string, comment: TicketComment): TicketActivity {
  return buildTicketActivity('comentario', comment.message, {
    id: `${ticketId}-comment-${comment.id}`,
    at: comment.createdAt,
    actor: comment.author,
    meta: { commentId: comment.id },
  })
}

export function appendStatusActivities(
  activity: TicketActivity[],
  previousStatus: string,
  nextStatus: string,
  actor?: string,
): TicketActivity[] {
  const next = [
    ...activity,
    buildTicketActivity('cambio_estado', `Estado cambiado de ${previousStatus} a ${nextStatus}`, {
      actor,
      meta: { from: previousStatus, to: nextStatus },
    }),
  ]

  if (nextStatus === 'Resuelto') {
    next.push(
      buildTicketActivity('resuelto', 'Ticket marcado como resuelto', {
        actor,
        meta: { to: nextStatus },
      }),
    )
  }

  return sortTicketActivityDesc(next)
}

export function appendAssignmentActivity(
  activity: TicketActivity[],
  technician: string,
  actor?: string,
): TicketActivity[] {
  return sortTicketActivityDesc([
    ...activity,
    buildTicketActivity('asignado', `Asignado a ${technician}`, {
      actor,
      meta: { to: technician },
    }),
  ])
}
