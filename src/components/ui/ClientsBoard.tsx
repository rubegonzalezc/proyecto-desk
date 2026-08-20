'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'
import { tenants } from '@/shared/mock/tenants'
import {
  loadTenantAdminStore,
  mergeTenantsWithAdminOverrides,
} from '@/shared/config/tenant-admin-storage'
import { useTablePagination } from '@/hooks/useTablePagination'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import TablePagination from '@/components/ui/TablePagination'
import TenantRow from '@/components/ui/TenantRow'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'

const columns = [
  { key: 'tenant', label: 'Cliente', width: '1.4fr' },
  { key: 'plan', label: 'Plan', width: '120px' },
  { key: 'systems', label: 'Sistemas' },
  { key: 'users', label: 'Usuarios', width: '110px' },
  { key: 'status', label: 'Estado', width: '130px' },
]

export default function ClientsBoard() {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const [adminStore, setAdminStore] = useState(loadTenantAdminStore)

  useEffect(() => {
    setAdminStore(loadTenantAdminStore())
  }, [pathname])

  const tenantsWithOverrides = useMemo(
    () => mergeTenantsWithAdminOverrides(tenants, adminStore),
    [adminStore],
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tenantsWithOverrides

    return tenantsWithOverrides.filter((tenant) => {
      const haystack = `${tenant.name} ${tenant.domain} ${tenant.plan} ${tenant.region}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [query, tenantsWithOverrides])

  const pagination = useTablePagination(filtered)
  const hasActiveFilters = Boolean(query.trim())

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
            placeholder="Buscar por nombre, dominio, plan o región"
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
            title="Sin resultados"
            description="No hay clientes que coincidan con esa búsqueda. Prueba otro término o limpia el filtro."
            actionLabel={hasActiveFilters ? 'Limpiar búsqueda' : 'Ver todos los clientes'}
            onAction={() => {
              setQuery('')
              pagination.resetPage()
            }}
          />
        </Box>
      ) : (
        pagination.pagedItems.map((tenant) => <TenantRow key={tenant.id} tenant={tenant} />)
      )}
    </AppTable>
  )
}
