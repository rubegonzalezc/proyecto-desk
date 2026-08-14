import { Box, Typography } from '@mui/material'
import LinkButton from '@/components/ui/LinkButton'

export default function NotFound() {
  return (
    <Box
      className="ice-wash"
      sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 3 }}
    >
      <Box className="liquid-glass fade-up" sx={{ p: 4, maxWidth: 420, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Página no encontrada
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          El recurso no existe en este prototipo.
        </Typography>
        <LinkButton href="/dashboard" variant="contained">
          Ir al dashboard
        </LinkButton>
      </Box>
    </Box>
  )
}
