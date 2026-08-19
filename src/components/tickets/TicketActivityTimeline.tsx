'use client'

import { useMemo } from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import { Box, Stack, Typography } from '@mui/material'
import type { TicketActivity, TicketActivityKind } from '@/shared/types/ticket'
import {
  getTicketActivityLabel,
  sortTicketActivityDesc,
} from '@/shared/utils/ticket-activity'
import AppCard from '@/components/ui/AppCard'

const ACTIVITY_STYLES: Record<
  TicketActivityKind,
  { color: string; bg: string; Icon: typeof AddCircleOutlineRoundedIcon }
> = {
  creado: { color: '#1D4ED8', bg: 'rgba(37, 99, 235, 0.12)', Icon: AddCircleOutlineRoundedIcon },
  asignado: { color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.12)', Icon: PersonOutlineRoundedIcon },
  cambio_estado: { color: '#B45309', bg: 'rgba(245, 158, 11, 0.16)', Icon: SwapHorizRoundedIcon },
  comentario: { color: '#047857', bg: 'rgba(16, 185, 129, 0.14)', Icon: ChatBubbleOutlineRoundedIcon },
  resuelto: { color: '#047857', bg: 'rgba(16, 185, 129, 0.14)', Icon: CheckCircleOutlineRoundedIcon },
}

type TicketActivityTimelineProps = {
  activity: TicketActivity[]
}

export default function TicketActivityTimeline({ activity }: TicketActivityTimelineProps) {
  const events = useMemo(() => sortTicketActivityDesc(activity), [activity])

  return (
    <AppCard lift={false} sx={{ mb: 2.5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Línea de tiempo
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Aún no hay actividad registrada en este ticket.
        </Typography>
      ) : (
        <Stack component="ol" spacing={0} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {events.map((event, index) => {
            const style = ACTIVITY_STYLES[event.kind]
            const Icon = style.Icon
            const isLast = index === events.length - 1

            return (
              <Box
                component="li"
                key={event.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr',
                  columnGap: 1.5,
                  pb: isLast ? 0 : 2,
                }}
              >
                <Stack alignItems="center" sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: style.bg,
                      color: style.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Box>
                  {!isLast ? (
                    <Box
                      sx={{
                        width: 2,
                        flex: 1,
                        minHeight: 16,
                        mt: 0.75,
                        bgcolor: 'divider',
                        borderRadius: 1,
                      }}
                    />
                  ) : null}
                </Stack>

                <Box sx={{ minWidth: 0, pt: 0.25 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0.25, sm: 1 }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>{getTicketActivityLabel(event.kind)}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                      {event.at}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: event.actor ? 0.5 : 0 }}>
                    {event.message}
                  </Typography>
                  {event.actor ? (
                    <Typography variant="caption" color="text.secondary">
                      Por {event.actor}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            )
          })}
        </Stack>
      )}
    </AppCard>
  )
}
