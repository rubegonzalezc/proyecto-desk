import type { ReactNode } from 'react'
import { Stack, TextField } from '@mui/material'

/**
 * Contenedor de toolbar para listados tabulares.
 * Alinea búsqueda, filtros y acciones en una fila responsive.
 */
export type TableToolbarProps = {
  children: ReactNode
}

export function TableToolbar({ children }: TableToolbarProps) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
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
}

export function TableSearchField({
  value,
  onChange,
  placeholder = 'Buscar…',
  flex = true,
}: TableSearchFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      sx={{
        flex: flex ? 1 : undefined,
        '& .MuiOutlinedInput-root': { borderRadius: '999px', height: 42 },
      }}
    />
  )
}
