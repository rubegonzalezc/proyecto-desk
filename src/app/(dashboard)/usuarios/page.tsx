import type { Metadata } from 'next'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import UsersBoard from '@/components/ui/UsersBoard'
import { awaitDemoRouteDelay } from '@/shared/config/demo-loading'

export const metadata: Metadata = {
  title: 'Usuarios',
}

export default async function UsersPage() {
  await awaitDemoRouteDelay()

  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="directorio" />}
        title="Usuarios"
        description="Técnicos, agentes y solicitantes con acceso a SynchroDesk."
      />
      <UsersBoard />
    </>
  )
}
