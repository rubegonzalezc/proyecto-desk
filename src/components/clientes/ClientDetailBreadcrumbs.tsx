'use client'

import { useTenant } from '@/components/layout/TenantProvider'
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'

type ClientDetailBreadcrumbsProps = {
  clientId: string
  clientName: string
}

export default function ClientDetailBreadcrumbs({ clientId, clientName }: ClientDetailBreadcrumbsProps) {
  const { tenant } = useTenant()
  const isActiveTenant = tenant.id === clientId

  return (
    <AppBreadcrumbs
      showActiveTenant={isActiveTenant}
      items={[
        { label: 'Clientes', href: '/clientes' },
        { label: clientName },
      ]}
    />
  )
}
