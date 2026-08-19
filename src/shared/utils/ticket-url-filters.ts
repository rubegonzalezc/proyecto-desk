import type { TicketStatus } from '@/shared/types/ticket'
import { TABLE_PAGE_SIZES, type TablePageSize } from '@/components/ui/TablePagination'

export type TicketStatusFilter = TicketStatus | 'Todos'

export type TicketUrlFilters = {
  q: string
  estado: TicketStatusFilter
  page: number
  size: TablePageSize
}

const STATUS_PARAM_MAP: Record<string, TicketStatusFilter> = {
  todos: 'Todos',
  nuevo: 'Nuevo',
  'en-progreso': 'En progreso',
  pendiente: 'Pendiente',
  resuelto: 'Resuelto',
  cerrado: 'Cerrado',
}

const STATUS_TO_PARAM: Record<TicketStatusFilter, string | null> = {
  Todos: null,
  Nuevo: 'nuevo',
  'En progreso': 'en-progreso',
  Pendiente: 'pendiente',
  Resuelto: 'resuelto',
  Cerrado: 'cerrado',
}

export function parseEstadoParam(value: string | null): TicketStatusFilter {
  if (!value) return 'Todos'
  return STATUS_PARAM_MAP[value] ?? 'Todos'
}

export function parsePageParam(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function parseSizeParam(value: string | null): TablePageSize {
  const parsed = Number.parseInt(value ?? '', 10)
  return TABLE_PAGE_SIZES.includes(parsed as TablePageSize) ? (parsed as TablePageSize) : 25
}

export function readTicketUrlFilters(searchParams: URLSearchParams): TicketUrlFilters {
  return {
    q: searchParams.get('q') ?? '',
    estado: parseEstadoParam(searchParams.get('estado')),
    page: parsePageParam(searchParams.get('page')),
    size: parseSizeParam(searchParams.get('size')),
  }
}

export function buildTicketSearchParams(
  current: URLSearchParams,
  patch: Partial<TicketUrlFilters> & { resetPage?: boolean },
): URLSearchParams {
  const next = new URLSearchParams(current.toString())
  const merged: TicketUrlFilters = {
    ...readTicketUrlFilters(current),
    ...patch,
  }

  if (patch.resetPage) {
    merged.page = 1
  }

  if (merged.q.trim()) next.set('q', merged.q.trim())
  else next.delete('q')

  const estadoParam = STATUS_TO_PARAM[merged.estado]
  if (estadoParam) next.set('estado', estadoParam)
  else next.delete('estado')

  if (merged.page > 1) next.set('page', String(merged.page))
  else next.delete('page')

  if (merged.size !== 25) next.set('size', String(merged.size))
  else next.delete('size')

  return next
}

export function ticketFiltersToQueryString(filters: TicketUrlFilters): string {
  return buildTicketSearchParams(new URLSearchParams(), filters).toString()
}
