'use client'

import { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { users } from '@/shared/mock/users'
import { useTablePagination } from '@/hooks/useTablePagination'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import TablePagination from '@/components/ui/TablePagination'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'
import UserRow from '@/components/ui/UserRow'

const columns = [
  { key: 'user', label: 'Usuario', width: '1.4fr' },
  { key: 'email', label: 'Correo', width: '1.3fr' },
  { key: 'role', label: 'Rol' },
  { key: 'status', label: 'Estado', width: '120px' },
  { key: 'access', label: 'Último acceso', width: '140px' },
]

export default function UsersBoard() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return users

    return users.filter((user) => {
      const haystack = `${user.name} ${user.email} ${user.role}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [query])

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
            placeholder="Buscar por nombre, correo o rol"
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
            description="No hay usuarios que coincidan con esa búsqueda en la demo."
          />
        </Box>
      ) : (
        pagination.pagedItems.map((user) => <UserRow key={user.id} user={user} />)
      )}
    </AppTable>
  )
}
