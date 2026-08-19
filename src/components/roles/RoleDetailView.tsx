'use client'

import { notFound } from 'next/navigation'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { roles } from '@/shared/mock/roles'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import AppCard from '@/components/ui/AppCard'
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import LinkButton from '@/components/ui/LinkButton'
import PageHeader from '@/components/ui/PageHeader'
import PermissionMatrix from '@/components/ui/PermissionMatrix'

export default function RoleDetailView({ id }: { id: string }) {
  const role = roles.find((item) => item.id === id)
  if (!role) notFound()

  return (
    <Box>
      <AppBreadcrumbs
        showActiveTenant
        items={[
          { label: 'Roles y permisos', href: '/roles' },
          { label: role.name },
        ]}
      />
      <PageHeader
        eyebrow={<TenantEyebrow suffix={role.id} />}
        title={role.name}
        description={role.description}
        extra={
          <LinkButton href="/roles" variant="outlined">
            Volver
          </LinkButton>
        }
      />
      <Stack spacing={2.5}>
        <AppCard lift={false}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Información
          </Typography>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <TextField label="Nombre del rol" defaultValue={role.name} fullWidth />
            <TextField label="Descripción" defaultValue={role.description} fullWidth />
          </Stack>
        </AppCard>
        <Box>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Matriz de permisos por sistema
          </Typography>
          <PermissionMatrix initial={role.permissions} />
        </Box>
        <Button variant="contained" disabled sx={{ alignSelf: 'flex-start' }}>
          Guardar cambios (demo)
        </Button>
      </Stack>
    </Box>
  )
}
