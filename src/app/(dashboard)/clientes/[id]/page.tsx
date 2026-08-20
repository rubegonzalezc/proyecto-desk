import type { Metadata } from 'next'
import ClientDetailView from '@/components/clientes/ClientDetailView'

export const metadata: Metadata = {
  title: 'Cliente',
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ClientDetailView id={id} />
}
