import type { Metadata } from 'next'
import NewInventoryItemForm from '@/components/inventario/NewInventoryItemForm'

export const metadata: Metadata = {
  title: 'Nuevo artículo',
}

export default function NewInventoryItemPage() {
  return <NewInventoryItemForm />
}
