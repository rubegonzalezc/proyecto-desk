'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { notFound } from 'next/navigation'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { getPlatformOperator, getTenantsSeedSync } from '@/lib/api/tenants'
import type { Tenant } from '@/shared/types/tenant'
import {
  loadTenantAdminStore,
  mergeTenantWithAdminOverride,
  patchTenantAdmin,
  TENANT_PLANS,
} from '@/shared/config/tenant-admin-storage'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import PageHeader from '@/components/ui/PageHeader'
import TenantLogo from '@/components/brand/TenantLogo'
import ClientDetailBreadcrumbs from '@/components/clientes/ClientDetailBreadcrumbs'
import { useToast } from '@/stores/ToastProvider'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'

type ClientDetailViewProps = {
  id: string
}

type PendingAction = 'suspend' | 'reactivate' | 'plan' | null

const statusColor: Record<Tenant['status'], 'success' | 'warning' | 'default'> = {
  Activo: 'success',
  Onboarding: 'warning',
  Suspendido: 'default',
}

export default function ClientDetailView({ id }: ClientDetailViewProps) {
  const baseTenant = getTenantsSeedSync().find((item) => item.id === id)
  const platformOperator = getPlatformOperator()
  const { showSuccess } = useToast()
  const [adminStore, setAdminStore] = useState(loadTenantAdminStore)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [nextPlan, setNextPlan] = useState<Tenant['plan']>('Business')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setAdminStore(loadTenantAdminStore())
  }, [])

  const tenant = useMemo(() => {
    if (!baseTenant) return undefined
    return mergeTenantWithAdminOverride(baseTenant, adminStore)
  }, [adminStore, baseTenant])

  if (!tenant) notFound()

  const isSuspended = tenant.status === 'Suspendido'

  const openPlanDialog = () => {
    setNextPlan(tenant.plan)
    setPendingAction('plan')
  }

  const closeDialog = () => {
    if (submitting) return
    setPendingAction(null)
  }

  const applyAction = useCallback(async () => {
    if (!pendingAction || submitting) return

    setSubmitting(true)
    try {
      await simulateApiDelay()

      if (pendingAction === 'suspend') {
        const next = patchTenantAdmin(tenant.id, { status: 'Suspendido' })
        setAdminStore(next)
        showSuccess(`${tenant.name} suspendido correctamente`)
      }

      if (pendingAction === 'reactivate') {
        const next = patchTenantAdmin(tenant.id, { status: 'Activo' })
        setAdminStore(next)
        showSuccess(`${tenant.name} reactivado correctamente`)
      }

      if (pendingAction === 'plan' && nextPlan !== tenant.plan) {
        const next = patchTenantAdmin(tenant.id, { plan: nextPlan })
        setAdminStore(next)
        showSuccess(`Plan de ${tenant.name} actualizado a ${nextPlan}`)
      }

      setPendingAction(null)
    } finally {
      setSubmitting(false)
    }
  }, [nextPlan, pendingAction, showSuccess, submitting, tenant.id, tenant.name, tenant.plan])

  return (
    <Box>
      <ClientDetailBreadcrumbs clientId={tenant.id} clientName={tenant.name} />
      <PageHeader
        eyebrow={tenant.id}
        title={tenant.name}
        description={`Tenant contratado. Consola de ${platformOperator.name}.`}
        extra={
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {isSuspended ? (
              <Button variant="contained" color="success" onClick={() => setPendingAction('reactivate')}>
                Reactivar cliente
              </Button>
            ) : (
              <Button variant="outlined" color="warning" onClick={() => setPendingAction('suspend')}>
                Suspender cliente
              </Button>
            )}
            <Button variant="outlined" onClick={openPlanDialog}>
              Cambiar plan
            </Button>
            <LinkButton href="/clientes" variant="outlined">
              Volver
            </LinkButton>
          </Stack>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppCard lift={false}>
            <Stack spacing={2} alignItems="flex-start">
              <TenantLogo logo={tenant.logo} name={tenant.name} size={56} />
              <Box>
                <Typography variant="h4">{tenant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tenant.domain}
                </Typography>
              </Box>
              <Chip size="small" label={tenant.status} color={statusColor[tenant.status]} />
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contrato
            </Typography>
            <Grid container spacing={2}>
              <Meta label="Plan" value={tenant.plan} />
              <Meta label="Alta" value={tenant.contractedAt} />
              <Meta label="Región" value={tenant.region} />
              <Meta label="Usuarios" value={String(tenant.users)} />
              <Meta label="Tickets abiertos" value={String(tenant.ticketsOpen)} />
              <Meta label="Sistemas" value={tenant.systems.join(', ')} />
              <Meta label="Admin del cliente" value={tenant.adminName} />
              <Meta label="Correo" value={tenant.adminEmail} />
            </Grid>
          </AppCard>
        </Grid>
      </Grid>

      <Dialog open={pendingAction === 'suspend'} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>¿Suspender a {tenant.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El tenant quedará en estado Suspendido. Los usuarios no podrán operar hasta que lo reactives en la demo.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" onClick={closeDialog} disabled={submitting}>
            Cancelar
          </Button>
          <Button variant="contained" color="warning" onClick={applyAction} loading={submitting} disabled={submitting}>
            Confirmar suspensión
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={pendingAction === 'reactivate'} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>¿Reactivar a {tenant.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El tenant volverá a estado Activo y recuperará el acceso operativo en la demostración.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" onClick={closeDialog} disabled={submitting}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={applyAction} loading={submitting} disabled={submitting}>
            Confirmar reactivación
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={pendingAction === 'plan'} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Cambiar plan de {tenant.name}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Selecciona el nuevo plan comercial. El cambio se guardará en sessionStorage durante la demo.
          </DialogContentText>
          <TextField
            select
            label="Nuevo plan"
            value={nextPlan}
            onChange={(event) => setNextPlan(event.target.value)}
            fullWidth
          >
            {TENANT_PLANS.map((plan) => (
              <MenuItem key={plan} value={plan}>
                {plan}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" onClick={closeDialog} disabled={submitting}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={applyAction}
            loading={submitting}
            disabled={submitting || nextPlan === tenant.plan}
          >
            Confirmar cambio
          </Button>
        </DialogActions>
      </Dialog>
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
