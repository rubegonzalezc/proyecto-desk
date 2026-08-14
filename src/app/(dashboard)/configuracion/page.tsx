import type { Metadata } from 'next'
import { Box, Chip, Divider, Stack, Switch, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import PrototypeBadge from '@/components/layout/PrototypeBadge'

export const metadata: Metadata = {
  title: 'Configuración',
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Google · tenant"
        title="Configuración"
        description="Ajustes del cliente activo. Consola de administrador SynchroDev. Nada se guarda."
      />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Organización
            </Typography>
            <Stack spacing={2}>
              <TextField label="Cliente" defaultValue="Google" fullWidth />
              <TextField label="Dominio" defaultValue="google.com" fullWidth />
              <TextField label="Zona horaria" defaultValue="America/Los_Angeles" fullWidth />
              <TextField label="Idioma" defaultValue="Español" fullWidth />
            </Stack>
          </AppCard>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              SLA de demostración
            </Typography>
            <Stack spacing={2}>
              <TextField label="Primera respuesta (crítica)" defaultValue="15 minutos" fullWidth />
              <TextField label="Resolución (alta)" defaultValue="4 horas" fullWidth />
              <TextField label="Horario de cobertura" defaultValue="Lun–Vie 08:00–19:00" fullWidth />
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Notificaciones
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Interruptores decorativos.
            </Typography>
            <Stack divider={<Divider flexItem />} spacing={1.25}>
              <Row label="SLA en riesgo" defaultChecked />
              <Row label="Nuevos tickets críticos" defaultChecked />
              <Row label="Resumen diario" />
            </Stack>
          </AppCard>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Prototipo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Esta instancia es una maqueta navegable para validar UX.
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Chip label="Next.js 16.3" size="small" />
              <Chip label="MUI v6" size="small" />
              <Chip label="Datos mock" size="small" />
            </Stack>
            <Box
              sx={{
                mt: 2.5,
                p: 1.5,
                borderRadius: '16px',
                bgcolor: '#0F172A',
                display: 'inline-flex',
              }}
            >
              <PrototypeBadge />
            </Box>
          </AppCard>
        </Grid>
      </Grid>
    </>
  )
}

function Row({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <Switch defaultChecked={defaultChecked} />
    </Stack>
  )
}
