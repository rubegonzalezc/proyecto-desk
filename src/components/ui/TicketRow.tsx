'use client'

import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import type { Ticket } from '@/shared/types/ticket'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import UserAvatar from './UserAvatar'

export default function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <Box
      component={Link}
      href={`/tickets/${ticket.id}`}
      className="app-table-row"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '110px 1fr 140px 120px 160px 150px',
        },
        gap: { xs: 1, md: 2 },
        alignItems: 'center',
        px: 2.25,
        py: 1.75,
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-of-type': { borderBottom: 0 },
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
        {ticket.id}
      </Typography>
      <Box>
        <Typography sx={{ fontWeight: 650, letterSpacing: '-0.02em' }}>{ticket.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {ticket.requester} · {ticket.category}
        </Typography>
      </Box>
      <StatusBadge status={ticket.status} />
      <PriorityBadge priority={ticket.priority} />
      <Stack direction="row" spacing={1} alignItems="center">
        <UserAvatar name={ticket.technician} size={28} />
        <Typography variant="body2" noWrap>
          {ticket.technician}
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {ticket.createdAt}
      </Typography>
    </Box>
  )
}
