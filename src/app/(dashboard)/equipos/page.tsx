import type { Metadata } from 'next'
import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { teams } from '@/shared/mock/teams'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Equipos',
}

export default function TeamsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organización"
        title="Equipos"
        description="Células de soporte: mesa, terreno, infraestructura, redes y desarrollo."
      />
      <Grid container spacing={2.25} className="stagger">
        {teams.map((team) => (
          <Grid key={team.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <AppCard sx={{ height: '100%' }}>
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: team.accent }} />
                <Typography variant="h4">{team.name}</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, minHeight: 44 }}>
                {team.description}
              </Typography>
              <Grid container spacing={1.5}>
                <Meta label="Lead" value={team.lead} />
                <Meta label="Miembros" value={String(team.members)} />
                <Meta label="Abiertos" value={String(team.ticketsOpen)} />
                <Meta label="SLA" value={team.sla} />
              </Grid>
            </AppCard>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Grid>
  )
}
