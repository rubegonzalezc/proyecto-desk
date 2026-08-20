import type { Tenant, TenantStatus } from '@/shared/types/tenant'

const STORAGE_KEY = 'synchrodesk:tenant-admin-overrides'

export type TenantAdminOverride = {
  status?: TenantStatus
  plan?: string
}

export type TenantAdminStore = Record<string, TenantAdminOverride>

export const TENANT_PLANS = ['Starter', 'Business', 'Enterprise'] as const

export type TenantPlan = (typeof TENANT_PLANS)[number]

function readStore(): TenantAdminStore {
  if (typeof window === 'undefined') return {}

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as TenantAdminStore
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeStore(store: TenantAdminStore) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function loadTenantAdminStore(): TenantAdminStore {
  return readStore()
}

export function patchTenantAdmin(tenantId: string, patch: TenantAdminOverride): TenantAdminStore {
  const store = readStore()
  const next = {
    ...store,
    [tenantId]: {
      ...store[tenantId],
      ...patch,
    },
  }
  writeStore(next)
  return next
}

export function mergeTenantWithAdminOverride(tenant: Tenant, store: TenantAdminStore): Tenant {
  const override = store[tenant.id]
  if (!override) return tenant

  return {
    ...tenant,
    status: override.status ?? tenant.status,
    plan: override.plan ?? tenant.plan,
  }
}

export function mergeTenantsWithAdminOverrides(tenants: Tenant[], store: TenantAdminStore): Tenant[] {
  return tenants.map((tenant) => mergeTenantWithAdminOverride(tenant, store))
}
