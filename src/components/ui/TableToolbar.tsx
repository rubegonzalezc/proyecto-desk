import type { ReactNode } from 'react'
import { Stack, TextField } from '@mui/material'

/**
 * Contenedor de toolbar para listados tabulares.
 * Alinea búsqueda, filtros y acciones en una fila responsive.
 */
export type TableToolbarProps = {
  children: ReactNode
  /** Apila búsqueda y filtros en columna (recomendado con chips). */
  stacked?: boolean
}

export function TableToolbar({ children, stacked = false }: TableToolbarProps) {
  return (
    <Stack
      direction={stacked ? 'column' : { xs: 'column', md: 'row' }}
      spacing={stacked ? 2 : 1.5}
      alignItems={stacked ? 'stretch' : { md: 'center' }}
    >
      {children}
    </Stack>
  )
}

/**
 * Campo de búsqueda estándar para toolbars de tabla.
 *
 * @example
 * ```tsx
 * <TableSearchField
 *   value={query}
 *   onChange={(value) => {
 *     setQuery(value)
 *     pagination.resetPage()
 *   }}
 *   placeholder="Filtrar por nombre o correo"
 * />
 * ```
 */
export type TableSearchFieldProps = {
  /** Valor controlado del campo. */
  value: string
  /** Callback al cambiar el texto; reiniciar paginación aquí si aplica. */
  onChange: (value: string) => void
  /** Placeholder del input. */
  placeholder?: string
  /** Si ocupa el espacio flexible del toolbar. Por defecto: true. */
  flex?: boolean
  /** Ocupa todo el ancho disponible del contenedor. */
  fullWidth?: boolean
}

export function TableSearchField({
  value,
  onChange,
  placeholder = 'Buscar…',
  flex = true,
  fullWidth = false,
}: TableSearchFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth={fullWidth}
      sx={{
        flex: flex ? 1 : undefined,
        width: fullWidth ? '100%' : undefined,
        minWidth: fullWidth ? 0 : { xs: 0, md: 220 },
        '& .MuiOutlinedInput-root': { borderRadius: '999px', height: 42 },
      }}
    />
  )
}
