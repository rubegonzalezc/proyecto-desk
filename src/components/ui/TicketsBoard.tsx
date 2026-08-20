'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Box, Chip, Stack, useMediaQuery, useTheme } from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'
import { getTechnicianOptions } from '@/shared/constants/ticket-form-options'
import { getStatusDisplayLabel } from '@/shared/labels/ticket-display'
import { filterTickets } from '@/lib/api/tickets'
import { saveTablePageSize } from '@/shared/config/ui-preferences-storage'
import { useTenant } from '@/components/layout/TenantProvider'
import {
  buildTicketSearchParams,
  hasActiveTicketFilters,
  readTicketUrlFilters,
} from '@/shared/utils/ticket-url-filters'
import TicketAdvancedFilters from '@/components/tickets/TicketAdvancedFilters'
import TicketsKanbanBoard from '@/components/tickets/TicketsKanbanBoard'
import TicketsViewToggle from '@/components/tickets/TicketsViewToggle'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useTablePagination } from '@/hooks/useTablePagination'
import type { TablePageSize } from '@/components/ui/TablePagination'
import AppCard from '@/components/ui/AppCard'
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

  const {
    q: query,
    estado: status,
    prioridad,
    tecnico,
    categoria,
    desde,
    hasta,
    vista,
    page,
    size: pageSize,
  } = urlFilters

  const queryString = searchParams.toString()

  const replaceFilters = useCallback(
    (patch: Parameters<typeof buildTicketSearchParams>[1]) => {
      const next = buildTicketSearchParams(searchParams, patch, { technicians })
      const nextQueryString = next.toString()
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams, technicians],
  )

  const filtered = useMemo(
    () =>
      filterTickets(tickets, {
        tenantId: tenant.id,
        q: query,
        estado: status,
        prioridad,
        tecnico,
        categoria,
        desde,
        hasta,
      }),
    [tickets, tenant.id, query, status, prioridad, tecnico, categoria, desde, hasta],
  )

  const pagination = useTablePagination(filtered, {
    page,
    pageSize,
    onPageChange: (nextPage) => replaceFilters({ page: nextPage }),
    onPageSizeChange: (nextSize) => {
      saveTablePageSize('tickets', nextSize)
      replaceFilters({ size: nextSize as TablePageSize, resetPage: true })
    },
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

  const toolbar = (
    <AppCard lift={false} sx={{ mb: 2.5 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ md: 'flex-start' }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
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
                  className="sd-filter-chip"
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
        </Box>
        <TicketsViewToggle
          value={vista}
          onChange={(nextView) => replaceFilters({ vista: nextView, resetPage: true })}
        />
      </Stack>
    </AppCard>
  )

  if (filtered.length === 0) {
    return (
      <>
        {toolbar}
        <AppCard lift={false}>
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
        </AppCard>
      </>
    )
  }

  if (vista === 'kanban') {
    return (
      <>
        {toolbar}
        <TicketsKanbanBoard tickets={filtered} queryString={queryString} />
      </>
    )
  }

  return (
    <>
      {toolbar}
      <AppTable
        columns={columns}
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
        {pagination.pagedItems.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </AppTable>
    </>
  )
}
