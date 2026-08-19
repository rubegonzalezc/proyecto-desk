import type { Ticket } from '@/shared/types/ticket'
import type { User } from '@/shared/types/user'
import type { Tenant } from '@/shared/types/tenant'
import { appSystems } from '@/shared/systems'

export type SearchResultGroup = 'tickets' | 'clientes' | 'usuarios' | 'navegacion'

export type SearchResult = {
  id: string
  group: SearchResultGroup
  label: string
  description?: string
  href: string
}

export type GlobalSearchInput = {
  query: string
  tickets: Ticket[]
  users: User[]
  tenants: Tenant[]
  tenantId?: string
}

export type GroupedSearchResults = Record<SearchResultGroup, SearchResult[]>

const GROUP_ORDER: SearchResultGroup[] = ['tickets', 'clientes', 'usuarios', 'navegacion']

const GROUP_LABELS: Record<SearchResultGroup, string> = {
  tickets: 'Tickets',
  clientes: 'Clientes',
  usuarios: 'Usuarios',
  navegacion: 'Navegación',
}

const navigationIndex = buildNavigationIndex()

export const MIN_GLOBAL_SEARCH_LENGTH = 2

export function getSearchGroupLabel(group: SearchResultGroup) {
  return GROUP_LABELS[group]
}

export function getSearchGroupOrder() {
  return GROUP_ORDER
}

function normalizeQuery(query: string) {
  return query.trim().toLowerCase()
}

function matches(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query)
}

function buildNavigationIndex(): SearchResult[] {
  const routes: SearchResult[] = []

  for (const system of appSystems) {
    for (const group of system.groups) {
      for (const item of group.items) {
        routes.push({
          id: `nav-${item.href}`,
          group: 'navegacion',
          label: item.label,
          description: system.shortName,
          href: item.href,
        })
      }
    }
  }

  routes.push({
    id: 'nav-clientes',
    group: 'navegacion',
    label: 'Clientes',
    description: 'Plataforma',
    href: '/clientes',
  })

  return routes
}

export function searchGlobal({
  query,
  tickets,
  users,
  tenants,
  tenantId,
}: GlobalSearchInput): GroupedSearchResults {
  const empty: GroupedSearchResults = {
    tickets: [],
    clientes: [],
    usuarios: [],
    navegacion: [],
  }

  const normalized = normalizeQuery(query)
  if (normalized.length < MIN_GLOBAL_SEARCH_LENGTH) return empty

  const ticketPool = tenantId ? tickets.filter((ticket) => ticket.tenantId === tenantId) : tickets
  const userPool = tenantId ? users.filter((user) => user.tenantId === tenantId) : users
  const ticketIdQuery = normalized.replace(/^#/, '')

  empty.tickets = ticketPool
    .filter((ticket) => {
      const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`
      return matches(haystack, normalized) || matches(ticket.id, ticketIdQuery)
    })
    .slice(0, 8)
    .map((ticket) => ({
      id: `ticket-${ticket.id}`,
      group: 'tickets' as const,
      label: ticket.title,
      description: ticket.id,
      href: `/tickets/${ticket.id}`,
    }))

  empty.clientes = tenants
    .filter((tenant) => matches(`${tenant.name} ${tenant.id} ${tenant.domain}`, normalized))
    .slice(0, 6)
    .map((tenant) => ({
      id: `client-${tenant.id}`,
      group: 'clientes' as const,
      label: tenant.name,
      description: tenant.domain,
      href: `/clientes/${tenant.id}`,
    }))

  empty.usuarios = userPool
    .filter((user) => matches(`${user.name} ${user.email} ${user.role}`, normalized))
    .slice(0, 6)
    .map((user) => ({
      id: `user-${user.id}`,
      group: 'usuarios' as const,
      label: user.name,
      description: user.email,
      href: '/usuarios',
    }))

  empty.navegacion = navigationIndex
    .filter((route) => matches(`${route.label} ${route.description ?? ''} ${route.href}`, normalized))
    .slice(0, 8)

  return empty
}

export function flattenSearchResults(grouped: GroupedSearchResults): SearchResult[] {
  return GROUP_ORDER.flatMap((group) => grouped[group])
}

export function countSearchResults(grouped: GroupedSearchResults) {
  return flattenSearchResults(grouped).length
}
