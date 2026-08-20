'use client'

import { useEffect, useMemo, useState } from 'react'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import { Box, Button, Stack } from '@mui/material'
import { useTenant } from '@/components/layout/TenantProvider'
import InviteUserModal from '@/components/usuarios/InviteUserModal'
import { listUsers } from '@/lib/api/users'
import type { User } from '@/shared/types/user'
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

  const [tenantUsers, setTenantUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    listUsers({ tenantId: tenant.id, q: query })
      .then((result) => {
        if (!cancelled) setTenantUsers(result.items)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [tenant.id, query])

  const filtered = tenantUsers

  const pagination = useTablePagination(filtered, { listingId: 'users' })
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
      {loading ? (
        <Box sx={{ p: 2 }}>
          <EmptyState title="Cargando usuarios" description="Obteniendo datos de la demo…" />
        </Box>
      ) : filtered.length === 0 ? (
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
