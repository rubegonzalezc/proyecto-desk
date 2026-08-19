import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import ClientsBoard from '@/components/ui/ClientsBoard'

export const metadata: Metadata = {
  title: 'Clientes',
}

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="SynchroDev · plataforma"
        title="Clientes"
        description="Empresas que tienen contratado SynchroDesk. Esta consola es del administrador de la plataforma."
      />
      <ClientsBoard />
    </>
  )
}
