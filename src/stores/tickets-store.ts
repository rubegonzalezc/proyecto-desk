import { tickets as seedTickets } from '@/shared/mock/tickets'
import { defaultTenantId } from '@/shared/mock/tenants'
import {
  appendAssignmentActivity,
  appendStatusActivities,
  commentToActivity,
  ensureTicketActivity,
  sortTicketActivityDesc,
} from '@/shared/utils/ticket-activity'
import { formatTicketTimestamp as formatTimestamp } from '@/shared/utils/ticket-timestamps'
import type { Ticket, TicketComment, TicketEvidence, TicketPriority, TicketStatus } from '@/shared/types/ticket'

export type CreateTicketInput = {
  title: string
  description: string
  priority: TicketPriority
  requester: string
  category: string
  status?: TicketStatus
  technician?: string
  team?: string
  tenantId?: string
  evidences?: TicketEvidence[]
}

export type UpdateTicketInput = Partial<
  Omit<Ticket, 'id' | 'comments' | 'evidences' | 'activity'>
>

export type AddCommentInput = {
  author: string
  role: string
  message: string
  attachments?: TicketComment['attachments']
  evidences?: TicketEvidence[]
}

function cloneTickets(source: Ticket[]): Ticket[] {
  return source.map((ticket) => ({
    ...ticket,
    comments: ticket.comments.map((comment) => ({
      ...comment,
      attachments: comment.attachments?.map((file) => ({ ...file })),
    })),
    evidences: ticket.evidences.map((item) => ({ ...item })),
    activity: ticket.activity?.map((item) => ({ ...item, meta: item.meta ? { ...item.meta } : undefined })),
  }))
}

function withDefaultTenant(ticket: Ticket): Ticket {
  return { ...ticket, tenantId: ticket.tenantId ?? defaultTenantId }
}

export function createInitialTickets(): Ticket[] {
  return cloneTickets(seedTickets).map((ticket) => ensureTicketActivity(withDefaultTenant(ticket)))
}

export { formatTicketTimestamp } from '@/shared/utils/ticket-timestamps'

export function nextTicketId(tickets: Ticket[]): string {
  const max = tickets.reduce((current, ticket) => {
    const match = ticket.id.match(/^TCK-(\d+)$/)
    if (!match) return current
    return Math.max(current, Number(match[1]))
  }, 1000)
  return `TCK-${max + 1}`
}

export function buildTicket(input: CreateTicketInput, tickets: Ticket[]): Ticket {
  const now = formatTimestamp()
  const technician = input.technician ?? 'Sin asignar'
  const ticket: Ticket = {
    id: nextTicketId(tickets),
    tenantId: input.tenantId ?? defaultTenantId,
    title: input.title,
    description: input.description,
    status: input.status ?? 'Nuevo',
    priority: input.priority,
    technician,
    requester: input.requester,
    team: input.team ?? 'Mesa de ayuda',
    category: input.category,
    createdAt: now,
    updatedAt: now,
    sla: 'Por definir',
    comments: [],
    evidences: input.evidences?.map((item) => ({ ...item })) ?? [],
    activity: [],
  }

  return ensureTicketActivity(ticket)
}

export function buildComment(input: AddCommentInput): TicketComment {
  return {
    id: `c-${Date.now()}`,
    author: input.author,
    role: input.role,
    message: input.message,
    createdAt: formatTimestamp(),
    attachments: input.attachments?.map((file) => ({ ...file })),
  }
}

export function applyTicketPatch(ticket: Ticket, patch: UpdateTicketInput): Ticket {
  const base = ensureTicketActivity(ticket)
  const now = formatTimestamp()
  let activity = base.activity ?? []

  if (patch.status && patch.status !== ticket.status) {
    activity = appendStatusActivities(activity, base.status, patch.status, patch.technician ?? base.technician)
  }

  if (patch.technician && patch.technician !== base.technician) {
    activity = appendAssignmentActivity(activity, patch.technician, patch.technician)
  }

  return {
    ...base,
    ...patch,
    activity,
    updatedAt: now,
  }
}

export function appendCommentToTicket(
  ticket: Ticket,
  input: AddCommentInput,
): { ticket: Ticket; comment: TicketComment } {
  const base = ensureTicketActivity(ticket)
  const comment = buildComment(input)
  const existingEvidenceIds = new Set(base.evidences.map((item) => item.id))
  const newEvidences =
    input.evidences?.filter((item) => !existingEvidenceIds.has(item.id)).map((item) => ({ ...item })) ?? []
  const activity = sortTicketActivityDesc([
    ...(base.activity ?? []),
    commentToActivity(base.id, comment),
  ])

  return {
    comment,
    ticket: {
      ...base,
      comments: [...base.comments, comment],
      evidences: [...base.evidences, ...newEvidences],
      activity,
      updatedAt: formatTimestamp(),
    },
  }
}
