import type { Metadata } from 'next'
import NewInventoryMovementForm from '@/components/inventario/NewInventoryMovementForm'

export const metadata: Metadata = {
  title: 'Nuevo movimiento',
}

export default function NewInventoryMovementPage() {
  return <NewInventoryMovementForm />
}
