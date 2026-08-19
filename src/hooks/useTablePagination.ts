import { useCallback, useState } from 'react'
import { TABLE_PAGE_SIZES, type TablePageSize } from '@/components/ui/TablePagination'

export type UseTablePaginationOptions = {
  /** Tamaño de página inicial. Por defecto: 25. */
  initialPageSize?: TablePageSize
  /** Página inicial. Por defecto: 1. */
  initialPage?: number
}

export type UseTablePaginationResult<T> = {
  /** Página actual (ajustada si excede el total tras filtrar). */
  page: number
  /** Tamaño de página activo. */
  pageSize: TablePageSize
  /** Ir a una página concreta. */
  setPage: (page: number) => void
  /** Cambiar tamaño de página y volver a la página 1. */
  setPageSize: (size: TablePageSize) => void
  /** Reiniciar a la página 1 (usar al cambiar filtros o búsqueda). */
  resetPage: () => void
  /** Número total de páginas. */
  pageCount: number
  /** Índice del primer ítem visible (1-indexed; 0 si no hay resultados). */
  from: number
  /** Índice del último ítem visible. */
  to: number
  /** Total de ítems en la colección paginada. */
  total: number
  /** Subconjunto de ítems para la página actual. */
  pagedItems: T[]
  /** Indica si hay al menos un ítem. */
  hasItems: boolean
}

/**
 * Gestiona estado de paginación para listados tabulares.
 *
 * @param items - Colección ya filtrada que se paginará.
 * @param options - Configuración inicial de página y tamaño.
 *
 * @example
 * ```tsx
 * const filtered = useMemo(() => items.filter(...), [items, query])
 * const pagination = useTablePagination(filtered)
 *
 * // Al cambiar un filtro:
 * setQuery(value)
 * pagination.resetPage()
 * ```
 */
export function useTablePagination<T>(
  items: T[],
  options: UseTablePaginationOptions = {},
): UseTablePaginationResult<T> {
  const { initialPageSize = 25, initialPage = 1 } = options
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState<TablePageSize>(initialPageSize)

  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, total)
  const pagedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  const handlePageSizeChange = useCallback((size: TablePageSize) => {
    setPageSize(size)
    setPage(1)
  }, [])

  return {
    page: currentPage,
    pageSize,
    setPage,
    setPageSize: handlePageSizeChange,
    resetPage,
    pageCount,
    from,
    to,
    total,
    pagedItems,
    hasItems: total > 0,
  }
}

export { TABLE_PAGE_SIZES }
