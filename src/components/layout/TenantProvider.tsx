'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  getDefaultTenantId,
  getInitialRecentTenantIds,
  getTenantByIdSync,
  getTenantsSeedSync,
} from '@/lib/api/tenants'
import type { Tenant } from '@/shared/types/tenant'

const RECENT_LIMIT = 5

type TenantContextValue = {
  tenant: Tenant
  tenants: Tenant[]
  recentTenants: Tenant[]
  setTenantId: (id: string) => void
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState(getDefaultTenantId())
  const [recentIds, setRecentIds] = useState<string[]>(getInitialRecentTenantIds())
  const tenants = useMemo(() => getTenantsSeedSync(), [])
  const tenant = getTenantByIdSync(tenantId)

  const select = useCallback((id: string) => {
    setTenantId(id)
    setRecentIds((current) => [id, ...current.filter((item) => item !== id)].slice(0, RECENT_LIMIT))
  }, [])

  const recentTenants = useMemo(
    () => recentIds.map(getTenantByIdSync).filter(Boolean),
    [recentIds],
  )

  const value = useMemo(
    () => ({ tenant, tenants, recentTenants, setTenantId: select }),
    [recentTenants, select, tenant],
  )

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider')
  }
  return context
}
