import type { InventoryItem, InventoryMovement } from '@/shared/types/inventory'

const STORAGE_KEY = 'synchrodesk:inventory'

export type InventorySessionData = {
  items: InventoryItem[]
  movements: InventoryMovement[]
}

export function loadInventorySession(): InventorySessionData | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as InventorySessionData
    if (!Array.isArray(parsed.items) || !Array.isArray(parsed.movements)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveInventorySession(data: InventorySessionData) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
