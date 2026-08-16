import { tickets as seedTickets } from '@/shared/mock/tickets'
import { defaultTenantId } from '@/shared/mock/tenants'
import type { Ticket, TicketComment, TicketPriority, TicketStatus } from '@/shared/types/ticket'

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
}

export type UpdateTicketInput = Partial<
  Omit<Ticket, 'id' | 'comments' | 'evidences'>
>

export type AddCommentInput = {
  author: string
  role: string
  message: string
  attachments?: TicketComment['attachments']
}

function cloneTickets(source: Ticket[]): Ticket[] {
  return source.map((ticket) => ({
    ...ticket,
    comments: ticket.comments.map((comment) => ({
      ...comment,
      attachments: comment.attachments?.map((file) => ({ ...file })),
    })),
    evidences: ticket.evidences.map((item) => ({ ...item })),
  }))
}

function withDefaultTenant(ticket: Ticket): Ticket {
  return ticket.tenantId ? ticket : { ...ticket, tenantId: defaultTenantId }
}

export function createInitialTickets(): Ticket[] {
  return cloneTickets(seedTickets).map(withDefaultTenant)
}

export function formatTicketTimestamp(date = new Date()): string {
  return date.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function nextTicketId(tickets: Ticket[]): string {
  const max = tickets.reduce((current, ticket) => {
    const match = ticket.id.match(/^TCK-(\d+)$/)
    if (!match) return current
    return Math.max(current, Number(match[1]))
  }, 1000)
  return `TCK-${max + 1}`
}

export function buildTicket(input: CreateTicketInput, tickets: Ticket[]): Ticket {
  const now = formatTicketTimestamp()
  return {
    id: nextTicketId(tickets),
    tenantId: input.tenantId ?? defaultTenantId,
    title: input.title,
    description: input.description,
    status: input.status ?? 'Nuevo',
    priority: input.priority,
    technician: input.technician ?? 'Sin asignar',
    requester: input.requester,
    team: input.team ?? 'Mesa de ayuda',
    category: input.category,
    createdAt: now,
    updatedAt: now,
    sla: 'Por definir',
    comments: [],
    evidences: [],
  }
}

export function buildComment(input: AddCommentInput): TicketComment {
  return {
    id: `c-${Date.now()}`,
    author: input.author,
    role: input.role,
    message: input.message,
    createdAt: formatTicketTimestamp(),
    attachments: input.attachments?.map((file) => ({ ...file })),
  }
}
