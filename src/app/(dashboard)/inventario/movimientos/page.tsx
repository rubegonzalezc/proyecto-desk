import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import InventoryMovementsBoard from '@/components/ui/InventoryMovementsBoard'

export const metadata: Metadata = {
  title: 'Movimientos',
}

export default function InventoryMovesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operación"
        title="Movimientos"
        description="Entradas, salidas, traslados y ajustes. Solo visualización."
      />
      <InventoryMovementsBoard />
    </>
  )
}
