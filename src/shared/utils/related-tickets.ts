import type { Ticket } from '@/shared/types/ticket'
import { parseTicketTimestamp } from '@/shared/utils/ticket-timestamps'

export type RelatedTicketMatch = {
  ticket: Ticket
  relation: 'categoria' | 'solicitante' | 'ambos'
}

const RELATION_LABEL: Record<RelatedTicketMatch['relation'], string> = {
  ambos: 'Misma categoría y solicitante',
  categoria: 'Misma categoría',
  solicitante: 'Mismo solicitante',
}

export function getRelatedTicketLabel(relation: RelatedTicketMatch['relation']): string {
  return RELATION_LABEL[relation]
}

function getRelation(ticket: Ticket, current: Ticket): RelatedTicketMatch['relation'] {
  const sameCategory = ticket.category === current.category
  const sameRequester = ticket.requester === current.requester
  if (sameCategory && sameRequester) return 'ambos'
  if (sameCategory) return 'categoria'
  return 'solicitante'
}

function relationScore(relation: RelatedTicketMatch['relation']): number {
  if (relation === 'ambos') return 3
  if (relation === 'categoria') return 2
  return 1
}

export function getRelatedTickets(
  current: Ticket,
  tickets: Ticket[],
  limit = 3,
): RelatedTicketMatch[] {
  return tickets
    .filter(
      (ticket) =>
        ticket.id !== current.id &&
        ticket.tenantId === current.tenantId &&
        (ticket.category === current.category || ticket.requester === current.requester),
    )
    .map((ticket) => ({
      ticket,
      relation: getRelation(ticket, current),
    }))
    .sort((left, right) => {
      const scoreDiff = relationScore(right.relation) - relationScore(left.relation)
      if (scoreDiff !== 0) return scoreDiff
      return parseTicketTimestamp(right.ticket.updatedAt) - parseTicketTimestamp(left.ticket.updatedAt)
    })
    .slice(0, limit)
}
