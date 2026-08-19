import { useCallback, useEffect, useState } from 'react'
import { TABLE_PAGE_SIZES, type TablePageSize } from '@/components/ui/TablePagination'

export type UseTablePaginationOptions = {
  /** Tamaño de página inicial. Por defecto: 25. */
  initialPageSize?: TablePageSize
  /** Página inicial. Por defecto: 1. */
  initialPage?: number
  /** Modo controlado: página actual desde fuera (p. ej. URL). */
  page?: number
  /** Modo controlado: tamaño de página desde fuera. */
  pageSize?: TablePageSize
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: TablePageSize) => void
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
  const {
    initialPageSize = 25,
    initialPage = 1,
    page: controlledPage,
    pageSize: controlledPageSize,
    onPageChange,
    onPageSizeChange,
  } = options
  const [internalPage, setInternalPage] = useState(initialPage)
  const [internalPageSize, setInternalPageSize] = useState<TablePageSize>(initialPageSize)

  const page = controlledPage ?? internalPage
  const pageSize = controlledPageSize ?? internalPageSize

  useEffect(() => {
    if (controlledPage !== undefined) return
    setInternalPage(initialPage)
  }, [controlledPage, initialPage])

  useEffect(() => {
    if (controlledPageSize !== undefined) return
    setInternalPageSize(initialPageSize)
  }, [controlledPageSize, initialPageSize])

  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, total)
  const pagedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const setPage = useCallback(
    (nextPage: number) => {
      if (onPageChange) onPageChange(nextPage)
      else setInternalPage(nextPage)
    },
    [onPageChange],
  )

  const resetPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const handlePageSizeChange = useCallback(
    (size: TablePageSize) => {
      if (onPageSizeChange) onPageSizeChange(size)
      else setInternalPageSize(size)
      setPage(1)
    },
    [onPageSizeChange, setPage],
  )

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
