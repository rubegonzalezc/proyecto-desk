'use client'

import { Chip, useMediaQuery, useTheme } from '@mui/material'
import type { TicketPriority } from '@/shared/types/ticket'
import { getPriorityDisplayLabel } from '@/shared/labels/ticket-display'

const map: Record<TicketPriority, { bg: string; color: string }> = {
  Baja: { bg: 'rgba(16, 185, 129, 0.12)', color: '#047857' },
  Media: { bg: 'rgba(37, 99, 235, 0.10)', color: '#1D4ED8' },
  Alta: { bg: 'rgba(245, 158, 11, 0.16)', color: '#B45309' },
  Crítica: { bg: 'rgba(239, 68, 68, 0.14)', color: '#B91C1C' },
}

type PriorityBadgeProps = {
  priority: TicketPriority
  compact?: boolean
}

export default function PriorityBadge({ priority, compact: compactProp }: PriorityBadgeProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const compact = compactProp ?? isMobile
  const style = map[priority]

  return (
    <Chip
      size="small"
      label={getPriorityDisplayLabel(priority, compact)}
      title={priority}
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 650,
        height: 26,
        maxWidth: '100%',
        '& .MuiChip-label': {
          px: 1.1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      }}
    />
  )
}
