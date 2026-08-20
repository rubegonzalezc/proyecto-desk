'use client'

import type { ReactNode } from 'react'
import LockOutlined from '@mui/icons-material/LockOutlined'
import { useTenant } from '@/components/layout/TenantProvider'
import ErrorPage from '@/components/ui/ErrorPage'
import { tenantHasInventoryAccess } from '@/shared/utils/tenant-access'

type InventoryAccessGuardProps = {
  children: ReactNode
}

export default function InventoryAccessGuard({ children }: InventoryAccessGuardProps) {
  const { tenant } = useTenant()

  if (!tenantHasInventoryAccess(tenant)) {
    return (
      <ErrorPage
        variant="embedded"
        code="403"
        title="Acceso denegado"
        description={`El módulo de inventario no está contratado para ${tenant.name}. En la demo, cambia a un cliente con Inventario activo (por ejemplo Google o Andes Logistics) o vuelve a la mesa de ayuda.`}
        actionLabel="Volver al dashboard"
        actionHref="/dashboard"
        icon={<LockOutlined />}
      />
    )
  }

  return children
}
