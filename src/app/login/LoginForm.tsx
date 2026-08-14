'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { platformOperator } from '@/shared/mock/tenants'
import PrototypeBadge from '@/components/layout/PrototypeBadge'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('prueba@synchrodev.cl')
  const [password, setPassword] = useState('synchrodev')

  return (
    <Box
      className="liquid-glass fade-up"
      sx={{
        width: '100%',
        maxWidth: 440,
        p: { xs: 3, md: 4 },
        borderRadius: '28px',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '14px',
              background: 'linear-gradient(165deg, #93C5FD 0%, #2563EB 48%, #1D4ED8 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 20px rgba(37,99,235,0.35)',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '-0.04em',
            }}
          >
            SD
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 750, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              {platformOperator.product}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 600 }}>
              {platformOperator.name} · plataforma
            </Typography>
          </Box>
        </Stack>

        <Typography variant="h2" sx={{ mb: 0.75 }}>
          Iniciar sesión
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3.5 }}>
          Acceso para administradores de la plataforma. Demo estática, sin autenticación real.
        </Typography>

        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            router.push('/dashboard')
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Correo"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 0.5, height: 48 }}>
              Entrar a la plataforma
            </Button>
            <Button type="button" variant="text" disabled>
              Olvidé mi contraseña (demo)
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ bgcolor: '#0F172A', borderRadius: '999px', display: 'inline-flex' }}>
            <PrototypeBadge />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
