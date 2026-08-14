import type { Metadata } from 'next'
import { Box, Typography } from '@mui/material'
import AuthShell from '@/components/layout/AuthShell'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export default function LoginPage() {
  return (
    <AuthShell>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: 8,
            py: 8,
            color: '#F8FAFC',
            background:
              'linear-gradient(180deg, rgba(37,99,235,0.22) 0%, rgba(2,6,23,0.08) 42%), linear-gradient(160deg, #0F172A 0%, #020617 100%)',
          }}
        >
          <Typography variant="h1" sx={{ maxWidth: 460, mb: 1.5, color: '#F8FAFC' }}>
            Una plataforma, todos los sistemas del cliente.
          </Typography>
          <Typography sx={{ maxWidth: 420, color: 'rgba(248,250,252,0.68)', fontSize: 16, lineHeight: 1.6 }}>
            SynchroDev opera SynchroDesk para empresas como Google: mesa de ayuda, inventario y más, desde la misma consola.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 6 },
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </AuthShell>
  )
}
