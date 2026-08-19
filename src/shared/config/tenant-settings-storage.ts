import type { Tenant } from '@/shared/types/tenant'

const STORAGE_PREFIX = 'synchrodesk:tenant-settings:'

export type TenantSettings = {
  org: string
  domain: string
  slaCriticalFirstResponse: string
  slaHighResolution: string
  slaCoverageHours: string
}

export function getDefaultTenantSettings(tenant: Tenant): TenantSettings {
  return {
    org: tenant.name,
    domain: tenant.domain,
    slaCriticalFirstResponse: '15 minutos',
    slaHighResolution: '4 horas',
    slaCoverageHours: 'Lun–Vie 08:00–19:00',
  }
}

function storageKey(tenantId: string) {
  return `${STORAGE_PREFIX}${tenantId}`
}

export function loadTenantSettings(tenantId: string, tenant: Tenant): TenantSettings {
  if (typeof window === 'undefined') {
    return getDefaultTenantSettings(tenant)
  }

  try {
    const raw = sessionStorage.getItem(storageKey(tenantId))
    if (!raw) return getDefaultTenantSettings(tenant)

    const parsed = JSON.parse(raw) as Partial<TenantSettings>
    const defaults = getDefaultTenantSettings(tenant)

    return {
      org: parsed.org ?? defaults.org,
      domain: parsed.domain ?? defaults.domain,
      slaCriticalFirstResponse: parsed.slaCriticalFirstResponse ?? defaults.slaCriticalFirstResponse,
      slaHighResolution: parsed.slaHighResolution ?? defaults.slaHighResolution,
      slaCoverageHours: parsed.slaCoverageHours ?? defaults.slaCoverageHours,
    }
  } catch {
    return getDefaultTenantSettings(tenant)
  }
}

export function saveTenantSettings(tenantId: string, settings: TenantSettings) {
  sessionStorage.setItem(storageKey(tenantId), JSON.stringify(settings))
}

export function clearTenantSettings(tenantId: string) {
  sessionStorage.removeItem(storageKey(tenantId))
}
