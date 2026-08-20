'use client'

import { useMemo, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import type { StockStatus } from '@/shared/types/inventory'
import { filterInventoryItems } from '@/lib/api/inventory'
import { useInventoryStore } from '@/stores/InventoryProvider'
import { useTablePagination } from '@/hooks/useTablePagination'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import InventoryItemRow from '@/components/ui/InventoryItemRow'
import TablePagination from '@/components/ui/TablePagination'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'

const columns = [
  { key: 'sku', label: 'SKU', width: '120px' },
  { key: 'name', label: 'Artículo', width: '1.4fr' },
  { key: 'wh', label: 'Almacén' },
  { key: 'stock', label: 'Stock', width: '100px' },
  { key: 'status', label: 'Estado', width: '140px' },
]

const statuses: Array<StockStatus | 'Todos'> = ['Todos', 'Disponible', 'Stock bajo', 'Agotado']

export default function InventoryItemsBoard() {
  const { items } = useInventoryStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')
  const [category, setCategory] = useState<string>('Todos')

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(items.map((item) => item.category))).sort()],
    [items],
  )

  const filtered = useMemo(
    () => filterInventoryItems(items, { q: query, status, category }),
    [category, items, query, status],
  )

  const pagination = useTablePagination(filtered, { listingId: 'inventory-items' })

  const resetFilters = () => pagination.resetPage()

  return (
    <AppTable
      columns={columns}
      toolbar={
        <TableToolbar>
          <TableSearchField
            value={query}
            onChange={(value) => {
              setQuery(value)
              resetFilters()
            }}
            placeholder="Buscar por SKU, artículo, categoría o almacén"
          />
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ width: '100%' }}>
            {statuses.map((item) => (
              <Chip
                key={item}
                className="sd-filter-chip"
                size="small"
                label={item}
                onClick={() => {
                  setStatus(item)
                  resetFilters()
                }}
                color={status === item ? 'primary' : 'default'}
                variant={status === item ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ width: '100%' }}>
            {categories.map((item) => (
              <Chip
                key={item}
                className="sd-filter-chip"
                size="small"
                label={item}
                onClick={() => {
                  setCategory(item)
                  resetFilters()
                }}
                color={category === item ? 'primary' : 'default'}
                variant={category === item ? 'filled' : 'outlined'}
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
            description="No hay artículos que coincidan con ese criterio en la demo."
          />
        </Box>
      ) : (
        pagination.pagedItems.map((item) => <InventoryItemRow key={item.sku} item={item} />)
      )}
    </AppTable>
  )
}
