import type { Metadata } from 'next'
import TicketDetailView from '@/components/tickets/TicketDetailView'

export const metadata: Metadata = {
  title: 'Detalle de ticket',
}

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <TicketDetailView id={id} />
}
