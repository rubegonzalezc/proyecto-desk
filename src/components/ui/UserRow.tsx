'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Box, Chip, Stack, Typography } from '@mui/material'
import type { User } from '@/shared/types/user'
import UserAvatar from '@/components/ui/UserAvatar'

const statusColor: Record<User['status'], 'success' | 'default' | 'warning'> = {
  Activo: 'success',
  Inactivo: 'default',
  Invitado: 'warning',
}

const rowLinkSx = {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': { bgcolor: 'action.hover' },
} as const

export default function UserRow({ user }: { user: User }) {
  return (
    <>
      <Box
        component={Link}
        href={`/usuarios/${user.id}`}
        className="app-table-row"
        aria-label={`Ver usuario ${user.name}`}
        sx={{
          ...rowLinkSx,
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Stack
          direction="row"
          sx={{
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
      </Box>

      <Box
        component={Link}
        href={`/usuarios/${user.id}`}
        className="app-table-row"
        aria-label={`Ver usuario ${user.name}`}
        sx={{
          ...rowLinkSx,
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
      </Box>
    </>
  )
}

function BoxMeta({ children }: { children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>{children}</div>
}
