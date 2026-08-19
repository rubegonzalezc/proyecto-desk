import type { Metadata } from 'next'
import RoleDetailView from '@/components/roles/RoleDetailView'

export const metadata: Metadata = {
  title: 'Editar rol',
}

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <RoleDetailView id={id} />
}
