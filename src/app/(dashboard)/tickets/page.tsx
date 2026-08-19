import type { Metadata } from 'next'
import { Suspense } from 'react'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import TableBoardSkeleton from '@/components/ui/skeletons/TableBoardSkeleton'
import TicketsBoard from '@/components/ui/TicketsBoard'
import { awaitDemoRouteDelay } from '@/shared/config/demo-loading'

export const metadata: Metadata = {
  title: 'Tickets',
}

export default async function TicketsPage() {
  await awaitDemoRouteDelay()

  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="cola de trabajo" />}
        title="Tickets"
        description="Incidentes y solicitudes de la mesa de ayuda. Tabla sólida con toolbar glass."
        actionLabel="Crear ticket"
        actionHref="/tickets/nuevo"
      />
      <Suspense fallback={<TableBoardSkeleton />}>
        <TicketsBoard />
      </Suspense>
    </>
  )
}
