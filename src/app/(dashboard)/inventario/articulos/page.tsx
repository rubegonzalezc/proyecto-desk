import type { Metadata } from 'next'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import InventoryItemsBoard from '@/components/ui/InventoryItemsBoard'

export const metadata: Metadata = {
  title: 'Artículos',
}

export default function InventoryItemsPage() {
  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="catálogo" />}
        title="Artículos"
        description="Stock por SKU. Los altas de la sesión se conservan hasta cerrar el navegador."
        actionLabel="Nuevo artículo"
        actionHref="/inventario/articulos/nuevo"
      />
      <InventoryItemsBoard />
    </>
  )
}
