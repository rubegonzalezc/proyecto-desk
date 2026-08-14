'use client'

import { Box, Typography, useTheme } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TicketDayPoint } from '@/shared/mock/dashboard'

export default function TicketsChart({ data }: { data: TicketDayPoint[] }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const axis = isDark ? 'rgba(248,250,252,0.55)' : '#667085'
  const grid = isDark ? 'rgba(255,255,255,0.08)' : '#D7E2F0'

  return (
    <Box sx={{ height: 280, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="openFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="doneFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="day" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.65)',
              background: isDark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
              boxShadow: '0 12px 32px rgba(15,23,42,0.08)',
            }}
          />
          <Area
            type="monotone"
            dataKey="abiertos"
            name="Abiertos"
            stroke="#2563EB"
            strokeWidth={2.4}
            fill="url(#openFill)"
          />
          <Area
            type="monotone"
            dataKey="resueltos"
            name="Resueltos"
            stroke="#10B981"
            strokeWidth={2.4}
            fill="url(#doneFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <Box sx={{ display: 'flex', gap: 2.5, mt: 1.5 }}>
        <LegendDot color="#2563EB" label="Abiertos" />
        <LegendDot color="#10B981" label="Resueltos" />
      </Box>
    </Box>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  )
}
