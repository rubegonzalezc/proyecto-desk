'use client'

import type { ReactNode } from 'react'
import { Box, Button, Typography } from '@mui/material'
import LinkButton from '@/components/ui/LinkButton'

type EmptyStateProps = {
  title: string
  description: string
  icon?: ReactNode
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  const showAction = Boolean(actionLabel && (actionHref || onAction))

  return (
    <Box
      className="liquid-glass fade-up"
      sx={{
        py: 8,
        px: 3,
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        gap: 1.25,
      }}
    >
      {icon ? (
        <Box sx={{ color: 'primary.main', mb: 1, display: 'grid', placeItems: 'center' }}>{icon}</Box>
      ) : null}
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        {description}
      </Typography>
      {showAction ? (
        actionHref ? (
          <LinkButton href={actionHref} variant="contained" sx={{ mt: 1.5 }}>
            {actionLabel}
          </LinkButton>
        ) : (
          <Button variant="contained" onClick={onAction} sx={{ mt: 1.5 }}>
            {actionLabel}
          </Button>
        )
      ) : null}
    </Box>
  )
}
