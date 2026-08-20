'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Box, Chip, Stack, Typography } from '@mui/material'
import type { Ticket, TicketStatus } from '@/shared/types/ticket'
import { buildTicketDetailHref } from '@/shared/utils/ticket-list-filters'
import AppCard from '@/components/ui/AppCard'
import PriorityBadge from '@/components/ui/PriorityBadge'
import UserAvatar from '@/components/ui/UserAvatar'

const KANBAN_COLUMNS: TicketStatus[] = ['Nuevo', 'En progreso', 'Pendiente', 'Resuelto']

type TicketsKanbanBoardProps = {
  tickets: Ticket[]
  queryString: string
}

export default function TicketsKanbanBoard({ tickets, queryString }: TicketsKanbanBoardProps) {
  const ticketsByStatus = useMemo(() => {
    const grouped = Object.fromEntries(KANBAN_COLUMNS.map((status) => [status, [] as Ticket[]])) as Record<
      TicketStatus,
      Ticket[]
    >

    for (const ticket of tickets) {
      if (KANBAN_COLUMNS.includes(ticket.status)) {
        grouped[ticket.status].push(ticket)
      }
    }

    return grouped
  }, [tickets])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${KANBAN_COLUMNS.length}, minmax(240px, 1fr))`,
          lg: `repeat(${KANBAN_COLUMNS.length}, minmax(0, 1fr))`,
        },
        gap: 2,
        overflowX: 'auto',
        pb: 1,
      }}
    >
      {KANBAN_COLUMNS.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tickets={ticketsByStatus[status]}
          queryString={queryString}
        />
      ))}
    </Box>
  )
}

function KanbanColumn({
  status,
  tickets,
  queryString,
}: {
  status: TicketStatus
  tickets: Ticket[]
  queryString: string
}) {
  return (
    <AppCard lift={false} sx={{ minHeight: 320, display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ flex: 1 }}>
          {status}
        </Typography>
        <Chip size="small" label={tickets.length} variant="outlined" />
      </Stack>

      <Stack spacing={1.25} sx={{ flex: 1 }}>
        {tickets.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Sin tickets
          </Typography>
        ) : (
          tickets.map((ticket) => (
            <KanbanCard key={ticket.id} ticket={ticket} queryString={queryString} />
          ))
        )}
      </Stack>
    </AppCard>
  )
}

function KanbanCard({ ticket, queryString }: { ticket: Ticket; queryString: string }) {
  return (
    <Box
      component={Link}
      href={buildTicketDetailHref(ticket.id, queryString)}
      sx={{
        display: 'block',
        p: 1.5,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
        {ticket.id}
      </Typography>
      <Typography sx={{ fontWeight: 650, mb: 1.25, lineHeight: 1.35 }}>{ticket.title}</Typography>
      <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="space-between" useFlexGap flexWrap="wrap">
        <PriorityBadge priority={ticket.priority} compact />
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
          <UserAvatar name={ticket.technician} size={24} />
          <Typography variant="caption" noWrap sx={{ maxWidth: 120 }}>
            {ticket.technician}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
