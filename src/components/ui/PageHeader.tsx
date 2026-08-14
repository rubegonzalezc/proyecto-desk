'use client'

import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import LinkButton from './LinkButton'

type PageHeaderProps = {
  eyebrow?: ReactNode
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  extra?: ReactNode
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  extra,
}: PageHeaderProps) {
  return (
    <Box
      className="fade-up"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 2.5,
        mb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        {eyebrow ? (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h2" sx={{ mt: 0.5, mb: 0.75 }}>
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
            {description}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>
        {extra}
        {actionLabel && actionHref ? (
          <LinkButton href={actionHref} variant="contained">
            {actionLabel}
          </LinkButton>
        ) : null}
      </Box>
    </Box>
  )
}
