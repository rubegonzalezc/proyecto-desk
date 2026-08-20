import type { Metadata } from 'next'
import UserDetailView from '@/components/usuarios/UserDetailView'

export const metadata: Metadata = {
  title: 'Detalle de usuario',
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <UserDetailView id={id} />
}
