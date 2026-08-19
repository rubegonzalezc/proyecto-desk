'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Box, Chip, Stack, Typography } from '@mui/material'
import TenantLogo from '@/components/brand/TenantLogo'
import type { Tenant } from '@/shared/types/tenant'

const statusColor: Record<Tenant['status'], 'success' | 'warning' | 'default'> = {
  Activo: 'success',
  Onboarding: 'warning',
  Suspendido: 'default',
}

export default function TenantRow({ tenant }: { tenant: Tenant }) {
  return (
    <Box
      component={Link}
      href={`/clientes/${tenant.id}`}
      className="app-table-row"
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 1,
          px: 2.25,
          py: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <TenantLogo logo={tenant.logo} name={tenant.name} size={32} />
          <BoxMeta>
            <Typography sx={{ fontWeight: 750 }}>{tenant.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {tenant.domain}
            </Typography>
          </BoxMeta>
        </Stack>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap alignItems="center">
          <Typography variant="body2">{tenant.plan}</Typography>
          <Typography variant="caption" color="text.secondary">
            {tenant.region}
          </Typography>
          <Chip size="small" label={tenant.status} color={statusColor[tenant.status]} variant="outlined" />
        </Stack>
        <Typography variant="body2">{tenant.systems.join(' · ')}</Typography>
        <Typography variant="caption" color="text.secondary">
          {tenant.users} usuarios
        </Typography>
      </Stack>

      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '1.4fr 120px 1fr 110px 130px',
          alignItems: 'center',
          px: 2.25,
          py: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
          <TenantLogo logo={tenant.logo} name={tenant.name} size={32} />
          <BoxMeta>
            <Typography sx={{ fontWeight: 750 }} noWrap>
              {tenant.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {tenant.domain}
            </Typography>
          </BoxMeta>
        </Stack>
        <Typography variant="body2" noWrap>
          {tenant.plan}
        </Typography>
        <Typography variant="body2" noWrap>
          {tenant.systems.join(' · ')}
        </Typography>
        <Typography variant="body2">{tenant.users}</Typography>
        <Chip size="small" label={tenant.status} color={statusColor[tenant.status]} variant="outlined" />
      </Box>
    </Box>
  )
}

function BoxMeta({ children }: { children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>{children}</div>
}
