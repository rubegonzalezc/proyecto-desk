import { tickets as seedTickets } from '@/shared/mock/tickets'
import { filterByTenant } from '@/shared/mock/tenant-scope'
import { filterTenantTickets } from '@/shared/utils/ticket-list-filters'
import type { TicketUrlFilters } from '@/shared/utils/ticket-url-filters'
import type { TablePageSize } from '@/components/ui/TablePagination'
import type { Ticket, TicketPriority, TicketStatus } from '@/shared/types/ticket'
import { paginate } from './pagination'
import type { PaginatedResult, PaginationParams } from './types'

export type ListTicketsParams = PaginationParams & {
  tenantId: string
  q?: string
  estado?: TicketStatus | 'Todos'
  prioridad?: TicketPriority | 'Todas'
  tecnico?: string
  categoria?: string
  desde?: string
  hasta?: string
}

export function toTicketUrlFilters(params: ListTicketsParams): TicketUrlFilters {
  return {
    q: params.q ?? '',
    estado: params.estado ?? 'Todos',
    prioridad: params.prioridad ?? 'Todas',
    tecnico: params.tecnico ?? 'Todos',
    categoria: params.categoria ?? 'Todas',
    desde: params.desde ?? '',
    hasta: params.hasta ?? '',
    vista: 'tabla',
    page: params.page ?? 1,
    size: (params.pageSize ?? 25) as TablePageSize,
  }
}

/** Filtra tickets en memoria (mock). Sustituirá la cláusula WHERE de Supabase. */
export function filterTickets(source: readonly Ticket[], params: ListTicketsParams): Ticket[] {
  const tenantScoped = filterByTenant(source, params.tenantId)
  const filters = toTicketUrlFilters(params)
  const hasExtraFilters =
    filters.q ||
    filters.estado !== 'Todos' ||
    filters.prioridad !== 'Todas' ||
    filters.tecnico !== 'Todos' ||
    filters.categoria !== 'Todas' ||
    filters.desde ||
    filters.hasta

  if (!hasExtraFilters) return tenantScoped
  return filterTenantTickets(tenantScoped, filters)
}

export async function listTickets(
  params: ListTicketsParams,
  source?: readonly Ticket[],
): Promise<PaginatedResult<Ticket>> {
  // TODO: supabase.from('tickets').select('*', { count: 'exact' }).eq('tenant_id', params.tenantId)
  const base = source ? [...source] : [...seedTickets]
  const filtered = filterTickets(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export async function getTicketById(
  id: string,
  source?: readonly Ticket[],
): Promise<Ticket | null> {
  // TODO: supabase.from('tickets').select('*').eq('id', id).single()
  const base = source ? [...source] : [...seedTickets]
  return base.find((ticket) => ticket.id === id) ?? null
}

export function getTicketsSeedSync(): Ticket[] {
  return [...seedTickets]
}

export async function getTicketsSeed(): Promise<Ticket[]> {
  // TODO: supabase.from('tickets').select('*')
  return getTicketsSeedSync()
}
