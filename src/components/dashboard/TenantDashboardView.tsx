'use client'

import { useMemo, type ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import HourglassEmptyOutlined from '@mui/icons-material/HourglassEmptyOutlined'
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined'
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined'
import HeadsetMicOutlined from '@mui/icons-material/HeadsetMicOutlined'
import TimerOutlined from '@mui/icons-material/TimerOutlined'
import { useTenant } from '@/components/layout/TenantProvider'
import { getDashboardForTenant } from '@/shared/mock/dashboard'
import { filterByTenant } from '@/shared/mock/tenant-scope'
import { useTicketsStore } from '@/stores/TicketsProvider'
import AppCard from '@/components/ui/AppCard'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import TicketRow from '@/components/ui/TicketRow'
import TicketsChart from '@/components/ui/TicketsChart'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import UserAvatar from '@/components/ui/UserAvatar'

const icons: Record<string, ReactNode> = {
  open: <ConfirmationNumberOutlined fontSize="small" />,
  pending: <HourglassEmptyOutlined fontSize="small" />,
  resolved: <TaskAltOutlined fontSize="small" />,
  sla: <WarningAmberOutlined fontSize="small" />,
  techs: <HeadsetMicOutlined fontSize="small" />,
  frt: <TimerOutlined fontSize="small" />,
}

export default function TenantDashboardView() {
  const { tenant } = useTenant()
  const { tickets } = useTicketsStore()

  const dashboard = useMemo(() => getDashboardForTenant(tenant.id), [tenant.id])
  const recentTickets = useMemo(
    () => filterByTenant(tickets, tenant.id).slice(0, 6),
    [tickets, tenant.id],
  )

  return (
    <Box>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="tenant activo" />}
        title="Operación de mesa de ayuda"
        description={`Consola de SynchroDev sobre ${tenant.name}. Los KPIs y tickets se actualizan al cambiar de cliente.`}
        actionLabel="Nuevo ticket"
        actionHref="/tickets/nuevo"
      />

      <Grid container spacing={2.25} className="stagger" sx={{ mb: 3.5 }}>
        {dashboard.kpis.map((kpi) => (
          <Grid key={`${tenant.id}-${kpi.id}`} size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
            <StatCard
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              tone={kpi.tone}
              icon={icons[kpi.id]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.25} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              Tickets por día
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Volumen abierto frente a resuelto en los últimos 7 días — {tenant.name}.
            </Typography>
            <TicketsChart key={tenant.id} data={dashboard.ticketsByDay} />
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AppCard lift={false} sx={{ height: '100%' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Técnicos más activos
            </Typography>
            <Stack spacing={1.75}>
              {dashboard.activeTechnicians.map((tech) => (
                <Stack key={`${tenant.id}-${tech.name}`} direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ position: 'relative' }}>
                    <UserAvatar name={tech.name} initials={tech.initials} />
                    <Box
                      sx={{
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: tech.online ? 'success.main' : 'text.disabled',
                        border: '2px solid',
                        borderColor: 'background.paper',
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700 }} noWrap>
                      {tech.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tech.team}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 750 }}>
                    {tech.resolved}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </AppCard>
        </Grid>
      </Grid>

      <AppCard lift={false} variant="solid" sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography variant="h4">Tickets recientes</Typography>
        </Box>
        {recentTickets.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <EmptyState
              title="Sin tickets recientes"
              description={`No hay tickets registrados para ${tenant.name} en esta sesión.`}
              actionLabel="Crear ticket"
              actionHref="/tickets/nuevo"
            />
          </Box>
        ) : (
          recentTickets.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
        )}
      </AppCard>
    </Box>
  )
}
