'use client'

import { Box, type BoxProps } from '@mui/material'

type AppCardProps = BoxProps & {
  variant?: 'glass' | 'solid'
  lift?: boolean
}

export default function AppCard({
  variant = 'glass',
  lift = true,
  className,
  children,
  sx,
  ...props
}: AppCardProps) {
  return (
    <Box
      className={[
        variant === 'glass' ? 'liquid-glass' : 'liquid-glass-solid',
        lift ? 'hover-lift' : '',
        'fade-up',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      sx={{ p: { xs: 2.25, md: 2.75 }, ...sx }}
      {...props}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  )
}
