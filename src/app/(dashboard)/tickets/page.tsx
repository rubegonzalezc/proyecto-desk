import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import TicketsBoard from '@/components/ui/TicketsBoard'

export const metadata: Metadata = {
  title: 'Tickets',
}

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cola de trabajo"
        title="Tickets"
        description="Incidentes y solicitudes de la mesa de ayuda. Tabla sólida con toolbar glass."
        actionLabel="Crear ticket"
        actionHref="/tickets/nuevo"
      />
      <TicketsBoard />
    </>
  )
}
