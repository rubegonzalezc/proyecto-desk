'use client'

import { useTenant } from '@/components/layout/TenantProvider'

export default function TenantEyebrow({ suffix }: { suffix?: string }) {
  const { tenant } = useTenant()
  return (
    <>
      {tenant.name}
      {suffix ? ` · ${suffix}` : ''}
    </>
  )
}
