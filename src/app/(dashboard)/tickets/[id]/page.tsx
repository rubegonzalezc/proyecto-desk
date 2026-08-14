import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { tickets } from '@/shared/mock/tickets'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import PageHeader from '@/components/ui/PageHeader'
import PriorityBadge from '@/components/ui/PriorityBadge'
import StatusBadge from '@/components/ui/StatusBadge'
import UserAvatar from '@/components/ui/UserAvatar'

export const metadata: Metadata = {
  title: 'Detalle de ticket',
}

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ticket = tickets.find((item) => item.id === id)
  if (!ticket) notFound()

  return (
    <Box>
      <PageHeader
        eyebrow={ticket.id}
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

          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Comentarios
            </Typography>
            {ticket.comments.length === 0 ? (
              <Typography color="text.secondary">Aún no hay comentarios en este ticket.</Typography>
            ) : (
              <Stack spacing={2} divider={<Divider flexItem />}>
                {ticket.comments.map((comment) => (
                  <Stack key={comment.id} direction="row" spacing={1.5}>
                    <UserAvatar name={comment.author} />
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="baseline">
                        <Typography sx={{ fontWeight: 700 }}>{comment.author}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {comment.role} · {comment.createdAt}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {comment.message}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            )}
          </AppCard>

          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Evidencias
            </Typography>
            {ticket.evidences.length === 0 ? (
              <Typography color="text.secondary">Sin archivos adjuntos.</Typography>
            ) : (
              <Stack spacing={1.25}>
                {ticket.evidences.map((file) => (
                  <Box
                    key={file.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 1.75,
                      py: 1.25,
                      borderRadius: '16px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 650 }}>{file.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {file.type} · {file.size}
                      </Typography>
                    </Box>
                    <Chip size="small" label="Ver" variant="outlined" />
                  </Box>
                ))}
              </Stack>
            )}
          </AppCard>
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
