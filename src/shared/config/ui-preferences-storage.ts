import type { PaletteMode } from '@mui/material'
import { TABLE_PAGE_SIZES, type TablePageSize } from '@/components/ui/TablePagination'

const THEME_KEY = 'synchrodesk:theme-mode'
const TABLE_PAGE_SIZE_PREFIX = 'synchrodesk:table-page-size:'

export type TableListingId =
  | 'tickets'
  | 'users'
  | 'clients'
  | 'inventory-items'
  | 'inventory-movements'

const DEFAULT_PAGE_SIZE: TablePageSize = 25

function isTablePageSize(value: number): value is TablePageSize {
  return TABLE_PAGE_SIZES.includes(value as TablePageSize)
}

export function loadThemeMode(): PaletteMode | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(THEME_KEY)
    if (raw === 'light' || raw === 'dark') return raw
    return null
  } catch {
    return null
  }
}

export function saveThemeMode(mode: PaletteMode) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(THEME_KEY, mode)
}

export function loadTablePageSize(
  listingId: TableListingId,
  fallback: TablePageSize = DEFAULT_PAGE_SIZE,
): TablePageSize {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = sessionStorage.getItem(`${TABLE_PAGE_SIZE_PREFIX}${listingId}`)
    if (!raw) return fallback
    const parsed = Number.parseInt(raw, 10)
    return isTablePageSize(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function saveTablePageSize(listingId: TableListingId, size: TablePageSize) {
  if (typeof window === 'undefined') return
  if (!isTablePageSize(size)) return
  sessionStorage.setItem(`${TABLE_PAGE_SIZE_PREFIX}${listingId}`, String(size))
}
