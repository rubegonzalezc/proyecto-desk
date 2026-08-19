'use client'

import { notFound } from 'next/navigation'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTicketsStore } from '@/stores/TicketsProvider'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import PriorityBadge from '@/components/ui/PriorityBadge'
import StatusBadge from '@/components/ui/StatusBadge'
import UserAvatar from '@/components/ui/UserAvatar'
import TicketThread from '@/components/tickets/TicketThread'

export default function TicketDetailView({ id }: { id: string }) {
  const { getTicketById } = useTicketsStore()
  const ticket = getTicketById(id)

  if (!ticket) notFound()

  return (
    <Box>
      <PageHeader
        eyebrow={<TenantEyebrow suffix={ticket.id} />}
        title={ticket.title}
        description={ticket.description}
        extra={
          <LinkButton href="/tickets" variant="outlined">
            Volver
          </LinkButton>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
              <Chip size="small" label={ticket.category} />
              <Chip size="small" label={ticket.team} variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              SLA · {ticket.sla}
            </Typography>
          </AppCard>

          <TicketThread ticketId={ticket.id} comments={ticket.comments} evidences={ticket.evidences} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Asignación
            </Typography>
            <Stack spacing={2}>
              <Meta label="Solicitante" value={ticket.requester} />
              <Stack direction="row" spacing={1.25} alignItems="center">
                <UserAvatar name={ticket.technician} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Técnico
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>{ticket.technician}</Typography>
                </Box>
              </Stack>
              <Meta label="Equipo" value={ticket.team} />
              <Meta label="Creado" value={ticket.createdAt} />
              <Meta label="Actualizado" value={ticket.updatedAt} />
            </Stack>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 650 }}>{value}</Typography>
    </Box>
  )
}
