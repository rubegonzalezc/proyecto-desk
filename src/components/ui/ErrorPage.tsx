import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import LinkButton from '@/components/ui/LinkButton'

type ErrorPageProps = {
  code: string
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  icon?: ReactNode
  /** Pantalla completa (login, rutas fuera del shell) o bloque dentro del dashboard. */
  variant?: 'standalone' | 'embedded'
}

export default function ErrorPage({
  code,
  title,
  description,
  actionLabel = 'Volver al dashboard',
  actionHref = '/dashboard',
  icon,
  variant = 'standalone',
}: ErrorPageProps) {
  const card = (
    <Box
      className="liquid-glass fade-up"
      sx={{
        p: { xs: 3.5, md: 4.5 },
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
      }}
    >
      {icon ? (
        <Box
          sx={{
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
            borderRadius: '18px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'action.hover',
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
      ) : null}
      <Typography
        sx={{
          fontSize: { xs: 56, md: 72 },
          fontWeight: 800,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          mb: 1.25,
          background: 'linear-gradient(165deg, #2563EB 0%, #1D4ED8 55%, #0F172A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {code}
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
        {description}
      </Typography>
      <LinkButton href={actionHref} variant="contained">
        {actionLabel}
      </LinkButton>
    </Box>
  )

  if (variant === 'embedded') {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: { xs: 6, md: 10 }, px: 2 }}>
        {card}
      </Box>
    )
  }

  return (
    <Box
      className="ice-wash"
      sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 3, py: 6 }}
    >
      {card}
    </Box>
  )
}
