import type { MovementType } from '@/shared/types/inventory'

export type NewInventoryItemFormErrors = {
  sku?: string
  name?: string
  stock?: string
  min?: string
}

export type NewInventoryMovementFormErrors = {
  sku?: string
  quantity?: string
  from?: string
  to?: string
  user?: string
}

const SKU_PATTERN = /^SKU-\d{4}$/

export function validateNewInventoryItemForm(
  sku: string,
  name: string,
  stock: string,
  min: string,
  existingSkus: string[],
): NewInventoryItemFormErrors {
  const errors: NewInventoryItemFormErrors = {}
  const normalizedSku = sku.trim().toUpperCase()

  if (!normalizedSku) {
    errors.sku = 'El SKU es obligatorio'
  } else if (!SKU_PATTERN.test(normalizedSku)) {
    errors.sku = 'Usa el formato SKU-0000'
  } else if (existingSkus.some((item) => item.toUpperCase() === normalizedSku)) {
    errors.sku = 'Ese SKU ya existe en el catálogo'
  }

  if (!name.trim()) {
    errors.name = 'El nombre del artículo es obligatorio'
  }

  const stockValue = Number(stock)
  if (!stock.trim() || Number.isNaN(stockValue) || stockValue < 0) {
    errors.stock = 'Indica un stock válido (0 o más)'
  }

  const minValue = Number(min)
  if (!min.trim() || Number.isNaN(minValue) || minValue < 0) {
    errors.min = 'Indica un mínimo válido (0 o más)'
  }

  return errors
}

export function validateNewInventoryMovementForm(
  sku: string,
  quantity: string,
  from: string,
  to: string,
  user: string,
  type: MovementType,
): NewInventoryMovementFormErrors {
  const errors: NewInventoryMovementFormErrors = {}

  if (!sku.trim()) {
    errors.sku = 'Selecciona un artículo'
  }

  const quantityValue = Number(quantity)
  if (!quantity.trim() || Number.isNaN(quantityValue) || quantityValue === 0) {
    errors.quantity = 'La cantidad no puede ser cero'
  } else if (type !== 'Ajuste' && quantityValue < 0) {
    errors.quantity = 'La cantidad debe ser positiva para este tipo'
  }

  if (!from.trim()) {
    errors.from = 'El origen es obligatorio'
  }

  if (!to.trim()) {
    errors.to = 'El destino es obligatorio'
  }

  if (!user.trim()) {
    errors.user = 'Indica quién registra el movimiento'
  }

  return errors
}

export function hasBlockingItemErrors(errors: NewInventoryItemFormErrors): boolean {
  return Boolean(errors.sku || errors.name || errors.stock || errors.min)
}

export function hasBlockingMovementErrors(errors: NewInventoryMovementFormErrors): boolean {
  return Boolean(errors.sku || errors.quantity || errors.from || errors.to || errors.user)
}
