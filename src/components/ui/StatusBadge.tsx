'use client'

import { Chip, useMediaQuery, useTheme } from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'
import { getStatusDisplayLabel } from '@/shared/labels/ticket-display'

const map: Record<TicketStatus, { bg: string; color: string }> = {
  Nuevo: { bg: 'rgba(37, 99, 235, 0.12)', color: '#1D4ED8' },
  'En progreso': { bg: 'rgba(96, 165, 250, 0.18)', color: '#1E3A8A' },
  Pendiente: { bg: 'rgba(245, 158, 11, 0.16)', color: '#B45309' },
  Resuelto: { bg: 'rgba(16, 185, 129, 0.14)', color: '#047857' },
  Cerrado: { bg: 'rgba(102, 112, 133, 0.14)', color: '#475467' },
}

type StatusBadgeProps = {
  status: TicketStatus
  /** Etiqueta corta en móvil (p. ej. "Progreso"). Por defecto detecta viewport. */
  compact?: boolean
}

export default function StatusBadge({ status, compact: compactProp }: StatusBadgeProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const compact = compactProp ?? isMobile
  const style = map[status]

  return (
    <Chip
      size="small"
      label={getStatusDisplayLabel(status, compact)}
      title={status}
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
