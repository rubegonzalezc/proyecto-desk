import type { StockStatus } from '@/shared/types/inventory'

export function deriveStockStatus(stock: number, min: number): StockStatus {
  if (stock <= 0) return 'Agotado'
  if (stock < min) return 'Stock bajo'
  return 'Disponible'
}
