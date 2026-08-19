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
        display: 'block',
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
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {ticket.id}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {ticket.createdAt}
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: 650, letterSpacing: '-0.02em' }}>{ticket.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {ticket.requester} · {ticket.category}
        </Typography>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          <StatusBadge status={ticket.status} compact />
          <PriorityBadge priority={ticket.priority} compact />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <UserAvatar name={ticket.technician} size={28} />
          <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
            {ticket.technician}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '110px 1fr 140px 120px 160px 150px',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {ticket.id}
        </Typography>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 650, letterSpacing: '-0.02em' }} noWrap>
            {ticket.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {ticket.requester} · {ticket.category}
          </Typography>
        </Box>
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <UserAvatar name={ticket.technician} size={28} />
          <Typography variant="body2" noWrap>
            {ticket.technician}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {ticket.createdAt}
        </Typography>
      </Box>
    </Box>
  )
}
