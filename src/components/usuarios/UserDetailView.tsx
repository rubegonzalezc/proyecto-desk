'use client'

import { notFound } from 'next/navigation'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { getUserByIdSync } from '@/lib/api/users'
import { useTenant } from '@/components/layout/TenantProvider'
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import UserAvatar from '@/components/ui/UserAvatar'

const statusColor: Record<'Activo' | 'Inactivo' | 'Invitado', 'success' | 'default' | 'warning'> = {
  Activo: 'success',
  Inactivo: 'default',
  Invitado: 'warning',
}

type UserDetailViewProps = {
  id: string
}

export default function UserDetailView({ id }: UserDetailViewProps) {
  const { tenant } = useTenant()
  const user = getUserByIdSync(id, tenant.id)

  if (!user || user.tenantId !== tenant.id) notFound()

  return (
    <Box>
      <AppBreadcrumbs
        showActiveTenant
        items={[
          { label: 'Usuarios', href: '/usuarios' },
          { label: user.name },
        ]}
      />
      <PageHeader
        eyebrow={<TenantEyebrow suffix={user.id} />}
        title={user.name}
        description={`Perfil del usuario en ${tenant.name}.`}
        extra={
          <LinkButton href="/usuarios" variant="outlined">
            Volver
          </LinkButton>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppCard lift={false}>
            <Stack spacing={2} alignItems="flex-start">
              <UserAvatar name={user.name} initials={user.initials} size={72} />
              <Box>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Chip size="small" label={user.status} color={statusColor[user.status]} />
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Información del usuario
            </Typography>
            <Grid container spacing={2}>
              <Meta label="Correo" value={user.email} />
              <Meta label="Rol" value={user.role} />
              <Meta label="Equipo" value={user.team} />
              <Meta label="Estado" value={user.status} />
              <Meta label="Último acceso" value={user.lastAccess} />
              <Meta label="ID" value={user.id} />
            </Grid>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Grid>
  )
}
