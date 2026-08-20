import type { Ticket } from '@/shared/types/ticket'
import type { TicketUrlFilters } from '@/shared/utils/ticket-url-filters'
import { matchesTicketDateRange } from '@/shared/utils/ticket-url-filters'

export function filterTenantTickets(tickets: Ticket[], filters: TicketUrlFilters): Ticket[] {
  const { q: query, estado: status, prioridad, tecnico, categoria, desde, hasta } = filters

  return tickets.filter((ticket) => {
    const matchesStatus = status === 'Todos' || ticket.status === status
    const matchesPriority = prioridad === 'Todas' || ticket.priority === prioridad
    const matchesTechnician = tecnico === 'Todos' || ticket.technician === tecnico
    const matchesCategory = categoria === 'Todas' || ticket.category === categoria
    const matchesDates = matchesTicketDateRange(ticket.createdAt, desde, hasta)
    const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`.toLowerCase()

    return (
      matchesStatus &&
      matchesPriority &&
      matchesTechnician &&
      matchesCategory &&
      matchesDates &&
      haystack.includes(query.toLowerCase())
    )
  })
}

export function buildTicketDetailHref(ticketId: string, queryString: string): string {
  return queryString ? `/tickets/${ticketId}?${queryString}` : `/tickets/${ticketId}`
}
