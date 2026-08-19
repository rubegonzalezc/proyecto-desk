import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import UsersBoard from '@/components/ui/UsersBoard'

export const metadata: Metadata = {
  title: 'Usuarios',
}

export default function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio"
        title="Usuarios"
        description="Técnicos, agentes y solicitantes con acceso a SynchroDesk."
      />
      <UsersBoard />
    </>
  )
}
