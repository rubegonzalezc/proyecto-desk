'use client'

import { useMemo, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import type { MovementType } from '@/shared/types/inventory'
import { useInventoryStore } from '@/stores/InventoryProvider'
import { useTablePagination } from '@/hooks/useTablePagination'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import InventoryMovementRow from '@/components/ui/InventoryMovementRow'
import TablePagination from '@/components/ui/TablePagination'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'

const columns = [
  { key: 'id', label: 'ID', width: '110px' },
  { key: 'type', label: 'Tipo', width: '120px' },
  { key: 'item', label: 'Artículo', width: '1.4fr' },
  { key: 'qty', label: 'Cant.', width: '80px' },
  { key: 'route', label: 'Origen / destino' },
  { key: 'date', label: 'Fecha', width: '150px' },
]

const movementTypes: Array<MovementType | 'Todos'> = ['Todos', 'Entrada', 'Salida', 'Traslado', 'Ajuste']

export default function InventoryMovementsBoard() {
  const { movements } = useInventoryStore()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<(typeof movementTypes)[number]>('Todos')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return movements.filter((movement) => {
      const matchesType = type === 'Todos' || movement.type === type
      const haystack =
        `${movement.id} ${movement.item} ${movement.sku} ${movement.user} ${movement.from} ${movement.to}`.toLowerCase()
      const matchesQuery = !normalized || haystack.includes(normalized)
      return matchesType && matchesQuery
    })
  }, [movements, query, type])

  const pagination = useTablePagination(filtered)

  return (
    <AppTable
      columns={columns}
      toolbar={
        <TableToolbar>
          <TableSearchField
            value={query}
            onChange={(value) => {
              setQuery(value)
              pagination.resetPage()
            }}
            placeholder="Buscar por ID, artículo, SKU, usuario o ruta"
          />
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ width: '100%' }}>
            {movementTypes.map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                onClick={() => {
                  setType(item)
                  pagination.resetPage()
                }}
                color={type === item ? 'primary' : 'default'}
                variant={type === item ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </TableToolbar>
      }
      footer={
        pagination.hasItems ? (
          <TablePagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            pageSize={pagination.pageSize}
            from={pagination.from}
            to={pagination.to}
            total={pagination.total}
            onPageChange={pagination.setPage}
            onPageSizeChange={pagination.setPageSize}
          />
        ) : undefined
      }
    >
      {filtered.length === 0 ? (
        <Box sx={{ p: 2 }}>
          <EmptyState
            title="Sin resultados"
            description="No hay movimientos que coincidan con ese criterio en la demo."
          />
        </Box>
      ) : (
        pagination.pagedItems.map((movement) => (
          <InventoryMovementRow key={movement.id} movement={movement} />
        ))
      )}
    </AppTable>
  )
}
