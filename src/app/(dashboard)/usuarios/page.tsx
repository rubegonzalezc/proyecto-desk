import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import { users } from '@/shared/mock/users'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'
import UserAvatar from '@/components/ui/UserAvatar'

export const metadata: Metadata = {
  title: 'Usuarios',
}

const columns = [
  { key: 'user', label: 'Usuario', width: '1.4fr' },
  { key: 'email', label: 'Correo', width: '1.3fr' },
  { key: 'role', label: 'Rol' },
  { key: 'status', label: 'Estado', width: '120px' },
  { key: 'access', label: 'Último acceso', width: '140px' },
]

const statusColor: Record<string, 'success' | 'default' | 'warning'> = {
  Activo: 'success',
  Inactivo: 'default',
  Invitado: 'warning',
}

export default function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio"
        title="Usuarios"
        description="Técnicos, agentes y solicitantes con acceso a SynchroDesk."
      />
      <AppTable columns={columns}>
        {users.map((user) => (
          <Stack
            key={user.id}
            direction="row"
            className="app-table-row"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1.3fr 1fr 120px 140px',
              alignItems: 'center',
              px: 2.25,
              py: 1.5,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minWidth: 860,
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <UserAvatar name={user.name} initials={user.initials} />
              <div>
                <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.team}
                </Typography>
              </div>
            </Stack>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.role}</Typography>
            <Chip size="small" label={user.status} color={statusColor[user.status]} variant="outlined" />
            <Typography variant="caption" color="text.secondary">
              {user.lastAccess}
            </Typography>
          </Stack>
        ))}
      </AppTable>
    </>
  )
}
