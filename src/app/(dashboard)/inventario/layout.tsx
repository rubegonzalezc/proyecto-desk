import type { ReactNode } from 'react'
import InventoryAccessGuard from '@/components/inventario/InventoryAccessGuard'

export default function InventarioLayout({ children }: { children: ReactNode }) {
  return <InventoryAccessGuard>{children}</InventoryAccessGuard>
}
