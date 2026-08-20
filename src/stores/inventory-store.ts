import { inventoryItems, inventoryMovements } from '@/shared/mock/inventory'
import { deriveStockStatus } from '@/shared/utils/inventory-status'
import { formatTicketTimestamp } from '@/shared/utils/ticket-timestamps'
import type { InventoryItem, InventoryMovement, MovementType } from '@/shared/types/inventory'

export type CreateInventoryItemInput = {
  sku: string
  name: string
  category: string
  warehouse: string
  stock: number
  min: number
  unit: string
}

export type CreateInventoryMovementInput = {
  type: MovementType
  sku: string
  item: string
  quantity: number
  from: string
  to: string
  user: string
}

function cloneItems(source: InventoryItem[]): InventoryItem[] {
  return source.map((item) => ({ ...item }))
}

function cloneMovements(source: InventoryMovement[]): InventoryMovement[] {
  return source.map((movement) => ({ ...movement }))
}

export function createInitialItems(): InventoryItem[] {
  return cloneItems(inventoryItems)
}

export function createInitialMovements(): InventoryMovement[] {
  return cloneMovements(inventoryMovements)
}

export function nextMovementId(movements: InventoryMovement[]): string {
  const max = movements.reduce((current, movement) => {
    const match = movement.id.match(/^MOV-(\d+)$/)
    if (!match) return current
    return Math.max(current, Number(match[1]))
  }, 3000)
  return `MOV-${max + 1}`
}

export function buildInventoryItem(input: CreateInventoryItemInput): InventoryItem {
  const stock = Math.max(0, input.stock)
  const min = Math.max(0, input.min)

  return {
    sku: input.sku.trim().toUpperCase(),
    name: input.name.trim(),
    category: input.category,
    warehouse: input.warehouse,
    stock,
    min,
    unit: input.unit,
    status: deriveStockStatus(stock, min),
  }
}

export function buildInventoryMovement(
  input: CreateInventoryMovementInput,
  movements: InventoryMovement[],
): InventoryMovement {
  return {
    id: nextMovementId(movements),
    type: input.type,
    sku: input.sku,
    item: input.item,
    quantity: input.quantity,
    from: input.from.trim(),
    to: input.to.trim(),
    user: input.user.trim(),
    createdAt: formatTicketTimestamp(),
  }
}
