import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'

/** Tamaños de página disponibles en listados tabulares. */
export const TABLE_PAGE_SIZES = [10, 25, 50] as const

export type TablePageSize = (typeof TABLE_PAGE_SIZES)[number]

/**
 * Props del componente `TablePagination`.
 *
 * Usar junto con `useTablePagination` para obtener los valores calculados.
 *
 * @example
 * ```tsx
 * const pagination = useTablePagination(filteredItems)
 *
 * {pagination.hasItems ? (
 *   <TablePagination
 *     page={pagination.page}
 *     pageCount={pagination.pageCount}
 *     pageSize={pagination.pageSize}
 *     from={pagination.from}
 *     to={pagination.to}
 *     total={pagination.total}
 *     onPageChange={pagination.setPage}
 *     onPageSizeChange={pagination.setPageSize}
 *   />
 * ) : null}
 * ```
 */
export type TablePaginationProps = {
  /** Página actual (1-indexed). */
  page: number
  /** Número total de páginas. */
  pageCount: number
  /** Tamaño de página activo. */
  pageSize: TablePageSize
  /** Índice del primer ítem visible (1-indexed; 0 si no hay resultados). */
  from: number
  /** Índice del último ítem visible. */
  to: number
  /** Total de ítems filtrados. */
  total: number
  /** Callback al cambiar de página. */
  onPageChange: (page: number) => void
  /**
   * Callback al cambiar el tamaño de página.
   * El hook `useTablePagination` ya reinicia a la página 1 internamente.
   */
  onPageSizeChange: (size: TablePageSize) => void
  /** Opciones de tamaño; por defecto `TABLE_PAGE_SIZES` (10 / 25 / 50). */
  pageSizes?: readonly TablePageSize[]
}

export default function TablePagination({
  page,
  pageCount,
  pageSize,
  from,
  to,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizes = TABLE_PAGE_SIZES,
}: TablePaginationProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <FormControl size="small">
          <Select
            value={pageSize}
            onChange={(event) => onPageSizeChange(event.target.value as TablePageSize)}
            sx={{
              borderRadius: '999px',
              height: 36,
              minWidth: 132,
              fontWeight: 600,
              bgcolor: 'background.paper',
            }}
          >
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                Mostrar {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          {from}–{to} de {total}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
        <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
          Página {page} de {pageCount}
        </Typography>
        <IconButton
          size="small"
          aria-label="Página anterior"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftRounded />
        </IconButton>
        <IconButton
          size="small"
          aria-label="Página siguiente"
          disabled={page >= pageCount}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        >
          <ChevronRightRounded />
        </IconButton>
      </Stack>
    </Stack>
  )
}
