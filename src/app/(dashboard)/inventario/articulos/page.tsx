import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import InventoryItemsBoard from '@/components/ui/InventoryItemsBoard'

export const metadata: Metadata = {
  title: 'Artículos',
}

export default function InventoryItemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Artículos"
        description="Stock por SKU. Datos de demostración, sin persistencia."
      />
      <InventoryItemsBoard />
    </>
  )
}
