'use client'

import { useMemo, useState } from 'react'
import { Box, Chip, Stack, useMediaQuery, useTheme } from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'
import { getStatusDisplayLabel } from '@/shared/labels/ticket-display'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useTablePagination } from '@/hooks/useTablePagination'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import TablePagination from '@/components/ui/TablePagination'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'
import TicketRow from '@/components/ui/TicketRow'

const statuses: Array<TicketStatus | 'Todos'> = [
  'Todos',
  'Nuevo',
  'En progreso',
  'Pendiente',
  'Resuelto',
  'Cerrado',
]

const columns = [
  { key: 'id', label: 'ID', width: '110px' },
  { key: 'title', label: 'Asunto' },
  { key: 'status', label: 'Estado', width: '140px' },
  { key: 'priority', label: 'Prioridad', width: '120px' },
  { key: 'tech', label: 'Técnico', width: '160px' },
  { key: 'date', label: 'Creado', width: '150px' },
]

export default function TicketsBoard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { tickets } = useTicketsStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = status === 'Todos' || ticket.status === status
      const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`.toLowerCase()
      return matchesStatus && haystack.includes(query.toLowerCase())
    })
  }, [query, status, tickets])

  const pagination = useTablePagination(filtered)
  const hasActiveFilters = Boolean(query.trim()) || status !== 'Todos'

  const clearFilters = () => {
    setQuery('')
    setStatus('Todos')
    pagination.resetPage()
  }

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
            placeholder="Filtrar por ID, asunto o técnico"
          />
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ width: '100%' }}>
            {statuses.map((item) => (
              <Chip
                key={item}
                size="small"
                label={getStatusDisplayLabel(item, isMobile)}
                title={item}
                onClick={() => {
                  setStatus(item)
                  pagination.resetPage()
                }}
                color={status === item ? 'primary' : 'default'}
                variant={status === item ? 'filled' : 'outlined'}
                sx={{
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
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
            title={hasActiveFilters ? 'Sin resultados' : 'Cola vacía'}
            description={
              hasActiveFilters
                ? 'No hay tickets con ese criterio. Prueba con otros filtros o limpia la búsqueda.'
                : 'Aún no hay tickets en la cola. Crea el primero para iniciar el flujo de la demo.'
            }
            actionLabel={hasActiveFilters ? 'Limpiar filtros' : 'Crear ticket'}
            {...(hasActiveFilters
              ? { onAction: clearFilters }
              : { actionHref: '/tickets/nuevo' })}
          />
        </Box>
      ) : (
        pagination.pagedItems.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
      )}
    </AppTable>
  )
}
