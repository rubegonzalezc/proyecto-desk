import {
  inventoryItems as seedItems,
  inventoryKpis,
  inventoryMovements as seedMovements,
  suppliers as seedSuppliers,
  warehouses as seedWarehouses,
} from '@/shared/mock/inventory'
import type {
  InventoryItem,
  InventoryMovement,
  MovementType,
  StockStatus,
  Supplier,
  Warehouse,
} from '@/shared/types/inventory'
import { paginate } from './pagination'
import type { PaginatedResult, PaginationParams } from './types'

export type ListInventoryItemsParams = PaginationParams & {
  tenantId?: string
  q?: string
  status?: StockStatus | 'Todos'
  category?: string
}

export type ListInventoryMovementsParams = PaginationParams & {
  tenantId?: string
  q?: string
  type?: MovementType | 'Todos'
}

/** Filtra artículos en memoria (mock). Sustituirá la cláusula WHERE de Supabase. */
export function filterInventoryItems(
  source: readonly InventoryItem[],
  params: ListInventoryItemsParams,
): InventoryItem[] {
  const normalized = params.q?.trim().toLowerCase()
  const status = params.status ?? 'Todos'
  const category = params.category ?? 'Todos'

  return source.filter((item) => {
    const matchesStatus = status === 'Todos' || item.status === status
    const matchesCategory = category === 'Todos' || item.category === category
    const haystack = `${item.sku} ${item.name} ${item.category} ${item.warehouse}`.toLowerCase()
    const matchesQuery = !normalized || haystack.includes(normalized)
    return matchesStatus && matchesCategory && matchesQuery
  })
}

/** Filtra movimientos en memoria (mock). Sustituirá la cláusula WHERE de Supabase. */
export function filterInventoryMovements(
  source: readonly InventoryMovement[],
  params: ListInventoryMovementsParams,
): InventoryMovement[] {
  const normalized = params.q?.trim().toLowerCase()
  const type = params.type ?? 'Todos'

  return source.filter((movement) => {
    const matchesType = type === 'Todos' || movement.type === type
    const haystack =
      `${movement.id} ${movement.item} ${movement.sku} ${movement.user} ${movement.from} ${movement.to}`.toLowerCase()
    const matchesQuery = !normalized || haystack.includes(normalized)
    return matchesType && matchesQuery
  })
}

export async function listInventoryItems(
  params: ListInventoryItemsParams = {},
  source?: readonly InventoryItem[],
): Promise<PaginatedResult<InventoryItem>> {
  // TODO: supabase.from('inventory_items').select('*', { count: 'exact' }).eq('tenant_id', params.tenantId)
  const base = source ? [...source] : [...seedItems]
  const filtered = filterInventoryItems(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export async function listInventoryMovements(
  params: ListInventoryMovementsParams = {},
  source?: readonly InventoryMovement[],
): Promise<PaginatedResult<InventoryMovement>> {
  // TODO: supabase.from('inventory_movements').select('*', { count: 'exact' }).eq('tenant_id', params.tenantId)
  const base = source ? [...source] : [...seedMovements]
  const filtered = filterInventoryMovements(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export function getWarehousesSeedSync() {
  return [...seedWarehouses]
}

export function getSuppliersSeedSync() {
  return [...seedSuppliers]
}

export async function listWarehouses(tenantId?: string): Promise<Warehouse[]> {
  // TODO: supabase.from('warehouses').select('*').eq('tenant_id', tenantId)
  void tenantId
  return [...seedWarehouses]
}

export async function listSuppliers(tenantId?: string): Promise<Supplier[]> {
  // TODO: supabase.from('suppliers').select('*').eq('tenant_id', tenantId)
  void tenantId
  return [...seedSuppliers]
}

export async function getInventoryKpis(tenantId?: string) {
  // TODO: supabase.from('inventory_kpis').select('*').eq('tenant_id', tenantId)
  void tenantId
  return [...inventoryKpis]
}

export function getInventoryItemsSeedSync(): InventoryItem[] {
  return [...seedItems]
}

export function getInventoryMovementsSeedSync(): InventoryMovement[] {
  return [...seedMovements]
}

export async function getInventoryItemsSeed(): Promise<InventoryItem[]> {
  // TODO: supabase.from('inventory_items').select('*')
  return getInventoryItemsSeedSync()
}

export async function getInventoryMovementsSeed(): Promise<InventoryMovement[]> {
  // TODO: supabase.from('inventory_movements').select('*')
  return getInventoryMovementsSeedSync()
}
