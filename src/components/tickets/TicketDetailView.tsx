'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTicketsStore } from '@/stores/TicketsProvider'
import AppCard from '@/components/ui/AppCard'
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import LinkButton from '@/components/ui/LinkButton'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'
import PriorityBadge from '@/components/ui/PriorityBadge'
import StatusBadge from '@/components/ui/StatusBadge'
import TicketActivityTimeline from '@/components/tickets/TicketActivityTimeline'
import RelatedTicketsBlock from '@/components/tickets/RelatedTicketsBlock'
import TicketPrintMetadata from '@/components/tickets/TicketPrintMetadata'
import TicketManagementPanel, { TicketManagementFields } from '@/components/tickets/TicketManagementPanel'
import TicketThread from '@/components/tickets/TicketThread'

const DRAWER_WIDTH = 360

export default function TicketDetailView({ id }: { id: string }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { getTicketById } = useTicketsStore()
  const ticket = getTicketById(id)

  if (!ticket) notFound()

  const handlePrint = () => {
    window.print()
  }

  return (
    <Box className="ticket-print-view">
      <Box className="print-hide">
        <AppBreadcrumbs
          showActiveTenant
          items={[
            { label: 'Tickets', href: '/tickets' },
            { label: ticket.id },
          ]}
        />
      </Box>
      <PageHeader
        eyebrow={
          <Box className="print-hide" component="span" sx={{ display: 'block' }}>
            <TenantEyebrow suffix={ticket.id} />
          </Box>
        }
        title={ticket.title}
        description={ticket.description}
        extra={
          <Stack direction="row" spacing={1} alignItems="center" className="print-hide">
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintOutlinedIcon />}
              onClick={handlePrint}
            >
              Imprimir
            </Button>
            {!isDesktop ? (
              <Button
                variant="contained"
                size="small"
                startIcon={<TuneRoundedIcon />}
                onClick={() => setDrawerOpen(true)}
              >
                Gestionar
              </Button>
            ) : null}
            <LinkButton href="/tickets" variant="outlined">
              Volver
            </LinkButton>
          </Stack>
        }
      />

      <TicketPrintMetadata ticket={ticket} />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }} className="print-hide">
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

          <Box className="print-only" sx={{ mb: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>
              Descripción
            </Typography>
            <Typography color="text.secondary">{ticket.description}</Typography>
          </Box>

          <Box className="print-hide">
            <TicketActivityTimeline activity={ticket.activity ?? []} />
            <RelatedTicketsBlock ticket={ticket} />
          </Box>

          <TicketThread ticketId={ticket.id} comments={ticket.comments} evidences={ticket.evidences} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }} className="print-hide" sx={{ display: { xs: 'none', lg: 'block' } }}>
          <TicketManagementPanel ticketId={ticket.id} />
        </Grid>
      </Grid>

      <Drawer
        className="print-hide"
        anchor="right"
        open={!isDesktop && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            maxWidth: '100vw',
            p: 2.5,
            boxSizing: 'border-box',
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h4">Gestión del ticket</Typography>
          <IconButton aria-label="Cerrar panel" onClick={() => setDrawerOpen(false)} edge="end">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <TicketManagementFields ticketId={ticket.id} />
      </Drawer>
    </Box>
  )
}
