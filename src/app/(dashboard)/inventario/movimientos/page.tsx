import type { Metadata } from 'next'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import InventoryMovementsBoard from '@/components/ui/InventoryMovementsBoard'

export const metadata: Metadata = {
  title: 'Movimientos',
}

export default function InventoryMovesPage() {
  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="operación" />}
        title="Movimientos"
        description="Entradas, salidas, traslados y ajustes. Los registros de la sesión persisten en demo."
        actionLabel="Nuevo movimiento"
        actionHref="/inventario/movimientos/nuevo"
      />
      <InventoryMovementsBoard />
    </>
  )
}
