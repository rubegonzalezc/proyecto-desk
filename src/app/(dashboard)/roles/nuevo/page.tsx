import type { Metadata } from 'next'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import PageHeader from '@/components/ui/PageHeader'
import PermissionMatrix from '@/components/ui/PermissionMatrix'

export const metadata: Metadata = {
  title: 'Crear rol',
}

export default function NewRolePage() {
  return (
    <Box>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="roles" />}
        title="Crear rol"
        description="Define el nombre y marca permisos por sistema. Los checkboxes solo cambian el estado visual."
        extra={
          <LinkButton href="/roles" variant="outlined">
            Cancelar
          </LinkButton>
        }
      />
      <Stack spacing={2.5}>
        <AppCard lift={false}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Información
          </Typography>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <TextField label="Nombre del rol" placeholder="Ej. Auditor interno" fullWidth />
            <TextField label="Descripción" placeholder="Qué puede hacer este rol" fullWidth />
          </Stack>
        </AppCard>
        <Box>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Matriz de permisos por sistema
          </Typography>
          <PermissionMatrix />
        </Box>
        <Button variant="contained" disabled sx={{ alignSelf: 'flex-start' }}>
          Guardar rol (demo)
        </Button>
      </Stack>
    </Box>
  )
}
