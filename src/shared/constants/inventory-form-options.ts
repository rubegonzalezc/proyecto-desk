import {
  getInventoryItemsSeedSync,
  getSuppliersSeedSync,
  getWarehousesSeedSync,
} from '@/lib/api/inventory'
import type { MovementType } from '@/shared/types/inventory'

const seedItems = getInventoryItemsSeedSync()
const seedWarehouses = getWarehousesSeedSync()
const seedSuppliers = getSuppliersSeedSync()

export const INVENTORY_CATEGORIES = Array.from(
  new Set(seedItems.map((item) => item.category)),
).sort()

export const INVENTORY_WAREHOUSES = seedWarehouses.map((warehouse) => warehouse.name)

export const INVENTORY_UNITS = Array.from(new Set(seedItems.map((item) => item.unit))).sort()

export const MOVEMENT_TYPES: MovementType[] = ['Entrada', 'Salida', 'Traslado', 'Ajuste']

export const INVENTORY_USERS = ['Sofía Vega', 'Carlos Soto', 'Andrés Silva', 'Elena Ruiz']

export const MOVEMENT_SUPPLIERS = seedSuppliers.map((supplier) => supplier.name)

export const MOVEMENT_DESTINATIONS = [
  ...INVENTORY_WAREHOUSES,
  'Recepción',
  'Técnico AS',
  'Merma / asignado',
]
