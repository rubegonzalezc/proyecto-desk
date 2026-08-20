import {
  defaultTenantId,
  demoTenantIds,
  demoTenantIdList,
  getTenantById as getMockTenantById,
  initialRecentTenantIds,
  platformOperator,
  tenants as seedTenants,
} from '@/shared/mock/tenants'
import type { Tenant } from '@/shared/types/tenant'
import { paginate } from './pagination'
import type { PaginatedResult, PaginationParams } from './types'

export type ListTenantsParams = PaginationParams & {
  q?: string
}

function filterTenants(source: readonly Tenant[], params: ListTenantsParams): Tenant[] {
  const normalized = params.q?.trim().toLowerCase()
  if (!normalized) return [...source]

  return source.filter((tenant) => {
    const haystack = `${tenant.name} ${tenant.domain} ${tenant.plan} ${tenant.region}`.toLowerCase()
    return haystack.includes(normalized)
  })
}

export async function listTenants(
  params: ListTenantsParams = {},
  source?: readonly Tenant[],
): Promise<PaginatedResult<Tenant>> {
  // TODO: supabase.from('tenants').select('*', { count: 'exact' })
  const base = source ? [...source] : [...seedTenants]
  const filtered = filterTenants(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  // TODO: supabase.from('tenants').select('*').eq('id', id).single()
  const tenant = seedTenants.find((item) => item.id === id)
  return tenant ?? null
}

export function getTenantByIdSync(id: string): Tenant {
  return getMockTenantById(id)
}

export function getTenantsSeedSync(): Tenant[] {
  return [...seedTenants]
}

export async function getTenantsSeed(): Promise<Tenant[]> {
  // TODO: supabase.from('tenants').select('*')
  return getTenantsSeedSync()
}

export function getDefaultTenantId(): string {
  return defaultTenantId
}

export function getPlatformOperator() {
  return platformOperator
}

export function getInitialRecentTenantIds(): string[] {
  return [...initialRecentTenantIds]
}

export function getDemoTenantIds() {
  return demoTenantIds
}

export function getDemoTenantIdList(): string[] {
  return [...demoTenantIdList]
}
