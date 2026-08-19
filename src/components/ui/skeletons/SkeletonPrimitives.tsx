'use client'

import type { ReactNode } from 'react'
import { Box, Skeleton } from '@mui/material'

type SkeletonLineProps = {
  width?: number | string
  height?: number
}

export function SkeletonLine({ width = '100%', height = 14 }: SkeletonLineProps) {
  return (
    <Skeleton
      variant="rounded"
      width={width}
      height={height}
      sx={{ borderRadius: '10px', transform: 'none' }}
    />
  )
}

export function SkeletonPill({ width = 160, height = 42 }: { width?: number; height?: number }) {
  return (
    <Skeleton
      variant="rounded"
      width={width}
      height={height}
      sx={{ borderRadius: '999px', transform: 'none' }}
    />
  )
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} sx={{ transform: 'none', flexShrink: 0 }} />
}

export function SkeletonCard({ children, sx }: { children: ReactNode; sx?: object }) {
  return (
    <Box
      className="liquid-glass-solid fade-up"
      sx={{
        p: { xs: 2.25, md: 2.75 },
        borderRadius: '24px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
