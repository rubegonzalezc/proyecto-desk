import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import AppCard from './AppCard'

const tones = {
  info: { bg: 'rgba(37, 99, 235, 0.10)', fg: '#1D4ED8' },
  warning: { bg: 'rgba(245, 158, 11, 0.12)', fg: '#B45309' },
  success: { bg: 'rgba(16, 185, 129, 0.12)', fg: '#047857' },
  error: { bg: 'rgba(239, 68, 68, 0.12)', fg: '#B91C1C' },
  neutral: { bg: 'rgba(15, 23, 42, 0.06)', fg: '#0F172A' },
} as const

type StatCardProps = {
  label: string
  value: string
  delta?: string
  tone?: keyof typeof tones
  icon?: ReactNode
}

export default function StatCard({ label, value, delta, tone = 'info', icon }: StatCardProps) {
  const colors = tones[tone]

  return (
    <AppCard sx={{ height: '100%', minHeight: 132 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 560, mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="h3" sx={{ lineHeight: 1.05, mb: 0.75 }}>
            {value}
          </Typography>
          {delta ? (
            <Typography variant="caption" sx={{ color: colors.fg, fontWeight: 600 }}>
              {delta}
            </Typography>
          ) : null}
        </Box>
        {icon ? (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              background: colors.bg,
              color: colors.fg,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        ) : null}
      </Box>
    </AppCard>
  )
}
