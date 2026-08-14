export type StockStatus = 'Disponible' | 'Stock bajo' | 'Agotado'
export type MovementType = 'Entrada' | 'Salida' | 'Traslado' | 'Ajuste'

export interface InventoryItem {
  sku: string
  name: string
  category: string
  warehouse: string
  stock: number
  min: number
  unit: string
  status: StockStatus
}

export interface Warehouse {
  id: string
  name: string
  location: string
  manager: string
  skus: number
  capacity: string
  status: 'Operativo' | 'Inventario físico'
}

export interface InventoryMovement {
  id: string
  type: MovementType
  sku: string
  item: string
  quantity: number
  from: string
  to: string
  user: string
  createdAt: string
}

export interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  leadTime: string
  status: 'Activo' | 'En evaluación'
}
