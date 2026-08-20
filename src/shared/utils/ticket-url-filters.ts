import type { TicketPriority, TicketStatus } from '@/shared/types/ticket'
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '@/shared/constants/ticket-form-options'
import { parseTicketTimestamp } from '@/shared/utils/ticket-timestamps'
import { TABLE_PAGE_SIZES, type TablePageSize } from '@/components/ui/TablePagination'

export type TicketStatusFilter = TicketStatus | 'Todos'
export type TicketPriorityFilter = TicketPriority | 'Todas'
export type TicketTechnicianFilter = 'Todos' | string
export type TicketCategoryFilter = 'Todas' | string
export type TicketViewMode = 'tabla' | 'kanban'

export type TicketUrlFilters = {
  q: string
  estado: TicketStatusFilter
  prioridad: TicketPriorityFilter
  tecnico: TicketTechnicianFilter
  categoria: TicketCategoryFilter
  desde: string
  hasta: string
  vista: TicketViewMode
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

const PRIORITY_PARAM_MAP: Record<string, TicketPriorityFilter> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  critica: 'Crítica',
}

const PRIORITY_TO_PARAM: Record<TicketPriorityFilter, string | null> = {
  Todas: null,
  Baja: 'baja',
  Media: 'media',
  Alta: 'alta',
  Crítica: 'critica',
}

const CATEGORY_PARAM_MAP: Record<string, string> = Object.fromEntries(
  TICKET_CATEGORIES.map((category) => [slugify(category), category]),
)

const CATEGORY_TO_PARAM: Record<string, string | null> = {
  Todas: null,
  ...Object.fromEntries(TICKET_CATEGORIES.map((category) => [category, slugify(category)])),
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}

function parseIsoDateParam(value: string | null): string {
  if (!value) return ''
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''
}

export function parseEstadoParam(value: string | null): TicketStatusFilter {
  if (!value) return 'Todos'
  return STATUS_PARAM_MAP[value] ?? 'Todos'
}

export function parsePrioridadParam(value: string | null): TicketPriorityFilter {
  if (!value) return 'Todas'
  return PRIORITY_PARAM_MAP[value] ?? 'Todas'
}

export function parseCategoriaParam(value: string | null): TicketCategoryFilter {
  if (!value) return 'Todas'
  return CATEGORY_PARAM_MAP[value] ?? 'Todas'
}

export function parseTecnicoParam(value: string | null, options: string[]): TicketTechnicianFilter {
  if (!value) return 'Todos'
  const match = options.find((option) => slugify(option) === value)
  return match ?? 'Todos'
}

export function parseViewParam(value: string | null): TicketViewMode {
  return value === 'kanban' ? 'kanban' : 'tabla'
}

export function parsePageParam(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function parseSizeParam(value: string | null): TablePageSize {
  const parsed = Number.parseInt(value ?? '', 10)
  return TABLE_PAGE_SIZES.includes(parsed as TablePageSize) ? (parsed as TablePageSize) : 25
}

export function readTicketUrlFilters(
  searchParams: URLSearchParams,
  options: { technicians?: string[] } = {},
): TicketUrlFilters {
  return {
    q: searchParams.get('q') ?? '',
    estado: parseEstadoParam(searchParams.get('estado')),
    prioridad: parsePrioridadParam(searchParams.get('prioridad')),
    tecnico: parseTecnicoParam(searchParams.get('tecnico'), options.technicians ?? []),
    categoria: parseCategoriaParam(searchParams.get('categoria')),
    desde: parseIsoDateParam(searchParams.get('desde')),
    hasta: parseIsoDateParam(searchParams.get('hasta')),
    vista: parseViewParam(searchParams.get('vista')),
    page: parsePageParam(searchParams.get('page')),
    size: parseSizeParam(searchParams.get('size')),
  }
}

export function buildTicketSearchParams(
  current: URLSearchParams,
  patch: Partial<TicketUrlFilters> & { resetPage?: boolean },
  options: { technicians?: string[] } = {},
): URLSearchParams {
  const next = new URLSearchParams(current.toString())
  const merged: TicketUrlFilters = {
    ...readTicketUrlFilters(current, options),
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

  const prioridadParam = PRIORITY_TO_PARAM[merged.prioridad]
  if (prioridadParam) next.set('prioridad', prioridadParam)
  else next.delete('prioridad')

  if (merged.tecnico !== 'Todos') next.set('tecnico', slugify(merged.tecnico))
  else next.delete('tecnico')

  const categoriaParam = CATEGORY_TO_PARAM[merged.categoria] ?? null
  if (categoriaParam) next.set('categoria', categoriaParam)
  else next.delete('categoria')

  if (merged.desde) next.set('desde', merged.desde)
  else next.delete('desde')

  if (merged.hasta) next.set('hasta', merged.hasta)
  else next.delete('hasta')

  if (merged.vista === 'kanban') next.set('vista', 'kanban')
  else next.delete('vista')

  if (merged.page > 1) next.set('page', String(merged.page))
  else next.delete('page')

  if (merged.size !== 25) next.set('size', String(merged.size))
  else next.delete('size')

  return next
}

export function hasActiveTicketFilters(filters: TicketUrlFilters): boolean {
  return (
    Boolean(filters.q.trim()) ||
    filters.estado !== 'Todos' ||
    filters.prioridad !== 'Todas' ||
    filters.tecnico !== 'Todos' ||
    filters.categoria !== 'Todas' ||
    Boolean(filters.desde) ||
    Boolean(filters.hasta)
  )
}

export function matchesTicketDateRange(createdAt: string, desde: string, hasta: string): boolean {
  if (!desde && !hasta) return true

  const timestamp = parseTicketTimestamp(createdAt)
  if (desde) {
    const start = new Date(`${desde}T00:00:00`).getTime()
    if (timestamp < start) return false
  }
  if (hasta) {
    const end = new Date(`${hasta}T23:59:59.999`).getTime()
    if (timestamp > end) return false
  }
  return true
}

export function ticketFiltersToQueryString(filters: TicketUrlFilters, technicians: string[] = []): string {
  return buildTicketSearchParams(new URLSearchParams(), filters, { technicians }).toString()
}
