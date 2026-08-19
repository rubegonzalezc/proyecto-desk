'use client'

import type { ReactNode } from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import type { User } from '@/shared/types/user'
import UserAvatar from '@/components/ui/UserAvatar'

const statusColor: Record<User['status'], 'success' | 'default' | 'warning'> = {
  Activo: 'success',
  Inactivo: 'default',
  Invitado: 'warning',
}

export default function UserRow({ user }: { user: User }) {
  return (
    <>
      <Stack
        direction="row"
        className="app-table-row"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 1,
          px: 2.25,
          py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <UserAvatar name={user.name} initials={user.initials} />
          <BoxMeta>
            <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user.team}
            </Typography>
          </BoxMeta>
        </Stack>
        <Typography variant="body2">{user.email}</Typography>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap alignItems="center">
          <Typography variant="body2">{user.role}</Typography>
          <Chip size="small" label={user.status} color={statusColor[user.status]} variant="outlined" />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Último acceso · {user.lastAccess}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        className="app-table-row"
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '1.4fr 1.3fr 1fr 120px 140px',
          alignItems: 'center',
          px: 2.25,
          py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
          <UserAvatar name={user.name} initials={user.initials} />
          <BoxMeta>
            <Typography sx={{ fontWeight: 700 }} noWrap>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user.team}
            </Typography>
          </BoxMeta>
        </Stack>
        <Typography variant="body2" noWrap>
          {user.email}
        </Typography>
        <Typography variant="body2" noWrap>
          {user.role}
        </Typography>
        <Chip size="small" label={user.status} color={statusColor[user.status]} variant="outlined" />
        <Typography variant="caption" color="text.secondary">
          {user.lastAccess}
        </Typography>
      </Stack>
    </>
  )
}

function BoxMeta({ children }: { children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>{children}</div>
}
