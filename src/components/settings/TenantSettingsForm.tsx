'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Box, Button, Chip, Divider, Stack, Switch, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import PrototypeBadge from '@/components/layout/PrototypeBadge'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import { useTenant } from '@/components/layout/TenantProvider'
import {
  getDefaultTenantSettings,
  loadTenantSettings,
  saveTenantSettings,
  type TenantSettings,
} from '@/shared/config/tenant-settings-storage'
import { useToast } from '@/stores/ToastProvider'

export default function TenantSettingsForm() {
  const { tenant } = useTenant()
  const { showSuccess } = useToast()
  const [settings, setSettings] = useState<TenantSettings>(() => getDefaultTenantSettings(tenant))
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSettings(loadTenantSettings(tenant.id, tenant))
  }, [tenant])

  const updateField = <K extends keyof TenantSettings>(key: K, value: TenantSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (saving) return

    setSaving(true)
    try {
      saveTenantSettings(tenant.id, settings)
      showSuccess('Cambios guardados (demo)')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="tenant" />}
        title="Configuración"
        description="Ajustes del cliente activo. Los cambios de organización y SLA se guardan en sessionStorage durante la demo."
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Organización
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Cliente"
                value={settings.org}
                onChange={(event) => updateField('org', event.target.value)}
                fullWidth
              />
              <TextField
                label="Dominio"
                value={settings.domain}
                onChange={(event) => updateField('domain', event.target.value)}
                fullWidth
              />
              <TextField label="Zona horaria" defaultValue="America/Los_Angeles" fullWidth />
              <TextField label="Idioma" defaultValue="Español" fullWidth />
            </Stack>
          </AppCard>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              SLA de demostración
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Primera respuesta (crítica)"
                value={settings.slaCriticalFirstResponse}
                onChange={(event) => updateField('slaCriticalFirstResponse', event.target.value)}
                fullWidth
              />
              <TextField
                label="Resolución (alta)"
                value={settings.slaHighResolution}
                onChange={(event) => updateField('slaHighResolution', event.target.value)}
                fullWidth
              />
              <TextField
                label="Horario de cobertura"
                value={settings.slaCoverageHours}
                onChange={(event) => updateField('slaCoverageHours', event.target.value)}
                fullWidth
              />
            </Stack>
          </AppCard>
          <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>
          </Box>
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
    </Box>
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
