'use client'

import { useEffect, useMemo, useState } from 'react'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import { Box, Button, Stack } from '@mui/material'
import { useTenant } from '@/components/layout/TenantProvider'
import InviteUserModal from '@/components/usuarios/InviteUserModal'
import { users } from '@/shared/mock/users'
import { filterByTenant } from '@/shared/mock/tenant-scope'
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
  const { tenant } = useTenant()
  const [query, setQuery] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)

  const tenantUsers = useMemo(
    () => filterByTenant(users, tenant.id),
    [tenant.id],
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tenantUsers

    return tenantUsers.filter((user) => {
      const haystack = `${user.name} ${user.email} ${user.role}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [query, tenantUsers])

  const pagination = useTablePagination(filtered)
  const hasActiveSearch = Boolean(query.trim())

  useEffect(() => {
    pagination.resetPage()
  }, [tenant.id, pagination.resetPage])

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<PersonAddOutlinedIcon />}
          onClick={() => setInviteOpen(true)}
        >
          Invitar usuario
        </Button>
      </Stack>

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
            title={hasActiveSearch ? 'Sin resultados' : 'Sin usuarios'}
            description={
              hasActiveSearch
                ? 'No hay usuarios que coincidan con esa búsqueda. Revisa el texto o limpia el filtro.'
                : `No hay usuarios registrados para ${tenant.name} en la demo.`
            }
            actionLabel={hasActiveSearch ? 'Limpiar búsqueda' : undefined}
            onAction={
              hasActiveSearch
                ? () => {
                    setQuery('')
                    pagination.resetPage()
                  }
                : undefined
            }
          />
        </Box>
      ) : (
        pagination.pagedItems.map((user) => <UserRow key={user.id} user={user} />)
      )}
    </AppTable>

      <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </>
  )
}
