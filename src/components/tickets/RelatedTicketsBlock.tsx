'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Box, Divider, Stack, Typography } from '@mui/material'
import type { Ticket } from '@/shared/types/ticket'
import { getRelatedTicketLabel, getRelatedTickets } from '@/shared/utils/related-tickets'
import AppCard from '@/components/ui/AppCard'
import PriorityBadge from '@/components/ui/PriorityBadge'
import StatusBadge from '@/components/ui/StatusBadge'
import { useTicketsStore } from '@/stores/TicketsProvider'

type RelatedTicketsBlockProps = {
  ticket: Ticket
}

export default function RelatedTicketsBlock({ ticket }: RelatedTicketsBlockProps) {
  const { tickets } = useTicketsStore()

  const related = useMemo(
    () => getRelatedTickets(ticket, tickets),
    [ticket, tickets],
  )

  if (related.length === 0) return null

  return (
    <AppCard lift={false} sx={{ mb: 2.5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Relacionados
      </Typography>
      <Stack spacing={1.25}>
        {related.map(({ ticket: relatedTicket, relation }, index) => (
          <Box key={relatedTicket.id}>
            <Box
              component={Link}
              href={`/tickets/${relatedTicket.id}`}
              sx={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                py: 0.5,
                borderRadius: '12px',
                transition: 'background-color 0.15s ease',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Stack spacing={0.75}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {relatedTicket.id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {relatedTicket.createdAt}
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: 650 }}>{relatedTicket.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {getRelatedTicketLabel(relation)}
                </Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                  <StatusBadge status={relatedTicket.status} compact />
                  <PriorityBadge priority={relatedTicket.priority} compact />
                </Stack>
              </Stack>
            </Box>
            {index < related.length - 1 ? <Divider sx={{ mt: 1.25 }} /> : null}
          </Box>
        ))}
      </Stack>
    </AppCard>
  )
}
