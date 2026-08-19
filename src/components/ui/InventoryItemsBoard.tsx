'use client'

import { useMemo, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'
import { inventoryItems } from '@/shared/mock/inventory'
import type { StockStatus } from '@/shared/types/inventory'
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
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')
  const [category, setCategory] = useState<string>('Todos')

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(inventoryItems.map((item) => item.category))).sort()],
    [],
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return inventoryItems.filter((item) => {
      const matchesStatus = status === 'Todos' || item.status === status
      const matchesCategory = category === 'Todos' || item.category === category
      const haystack = `${item.sku} ${item.name} ${item.category} ${item.warehouse}`.toLowerCase()
      const matchesQuery = !normalized || haystack.includes(normalized)
      return matchesStatus && matchesCategory && matchesQuery
    })
  }, [category, query, status])

  const pagination = useTablePagination(filtered)

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
