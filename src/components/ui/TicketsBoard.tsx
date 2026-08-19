'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Box, Chip, Stack, useMediaQuery, useTheme } from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'
import { getTechnicianOptions } from '@/shared/constants/ticket-form-options'
import { getStatusDisplayLabel } from '@/shared/labels/ticket-display'
import { useTenant } from '@/components/layout/TenantProvider'
import { filterByTenant } from '@/shared/mock/tenant-scope'
import {
  buildTicketSearchParams,
  hasActiveTicketFilters,
  matchesTicketDateRange,
  readTicketUrlFilters,
} from '@/shared/utils/ticket-url-filters'
import TicketAdvancedFilters from '@/components/tickets/TicketAdvancedFilters'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useTablePagination } from '@/hooks/useTablePagination'
import type { TablePageSize } from '@/components/ui/TablePagination'
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { tenant } = useTenant()
  const { tickets } = useTicketsStore()

  const technicians = useMemo(() => getTechnicianOptions(tenant.id), [tenant.id])

  const urlFilters = useMemo(
    () => readTicketUrlFilters(searchParams, { technicians }),
    [searchParams, technicians],
  )

  const { q: query, estado: status, prioridad, tecnico, categoria, desde, hasta, page, size: pageSize } =
    urlFilters

  const replaceFilters = useCallback(
    (patch: Parameters<typeof buildTicketSearchParams>[1]) => {
      const next = buildTicketSearchParams(searchParams, patch, { technicians })
      const queryString = next.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams, technicians],
  )

  const tenantTickets = useMemo(
    () => filterByTenant(tickets, tenant.id),
    [tickets, tenant.id],
  )

  const filtered = useMemo(() => {
    return tenantTickets.filter((ticket) => {
      const matchesStatus = status === 'Todos' || ticket.status === status
      const matchesPriority = prioridad === 'Todas' || ticket.priority === prioridad
      const matchesTechnician = tecnico === 'Todos' || ticket.technician === tecnico
      const matchesCategory = categoria === 'Todas' || ticket.category === categoria
      const matchesDates = matchesTicketDateRange(ticket.createdAt, desde, hasta)
      const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`.toLowerCase()
      return (
        matchesStatus &&
        matchesPriority &&
        matchesTechnician &&
        matchesCategory &&
        matchesDates &&
        haystack.includes(query.toLowerCase())
      )
    })
  }, [categoria, desde, hasta, prioridad, query, status, tecnico, tenantTickets])

  const pagination = useTablePagination(filtered, {
    page,
    pageSize,
    onPageChange: (nextPage) => replaceFilters({ page: nextPage }),
    onPageSizeChange: (nextSize) => replaceFilters({ size: nextSize as TablePageSize, resetPage: true }),
  })

  const hasActiveFilters = hasActiveTicketFilters(urlFilters)

  const previousTenantId = useRef(tenant.id)

  useEffect(() => {
    if (previousTenantId.current === tenant.id) return
    previousTenantId.current = tenant.id
    replaceFilters({ resetPage: true })
  }, [tenant.id, replaceFilters])

  const clearFilters = () => {
    router.replace(pathname, { scroll: false })
  }

  return (
    <AppTable
      columns={columns}
      toolbar={
        <TableToolbar stacked>
          <TableSearchField
            value={query}
            onChange={(value) => replaceFilters({ q: value, resetPage: true })}
            placeholder="Filtrar por ID, asunto o técnico"
            flex={false}
            fullWidth
          />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {statuses.map((item) => (
              <Chip
                key={item}
                size="small"
                label={getStatusDisplayLabel(item, isMobile)}
                title={item}
                onClick={() => replaceFilters({ estado: item, resetPage: true })}
                color={status === item ? 'primary' : 'default'}
                variant={status === item ? 'filled' : 'outlined'}
                sx={{
                  '& .MuiChip-label': {
                    px: 1.1,
                  },
                }}
              />
            ))}
          </Stack>
          <TicketAdvancedFilters
            filters={{ prioridad, tecnico, categoria, desde, hasta }}
            technicians={technicians}
            hasActiveFilters={hasActiveFilters}
            onChange={replaceFilters}
            onClear={clearFilters}
          />
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
                : `Aún no hay tickets para ${tenant.name}. Crea el primero para iniciar el flujo de la demo.`
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
