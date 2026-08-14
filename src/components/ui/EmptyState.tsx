import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

type EmptyStateProps = {
  title: string
  description: string
  icon?: ReactNode
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
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
    </Box>
  )
}
