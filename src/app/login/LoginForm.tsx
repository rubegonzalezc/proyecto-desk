'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { getPlatformOperator } from '@/lib/api/tenants'
import PrototypeBadge from '@/components/layout/PrototypeBadge'

const platformOperator = getPlatformOperator()

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('prueba@synchrodev.cl')
  const [password, setPassword] = useState('synchrodev')

  const enter = () => router.push('/dashboard')

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
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Acceso para administradores de la plataforma. SSO visual; Better Auth aún no está conectado.
        </Typography>

        <Stack spacing={1.25} sx={{ mb: 2.5 }}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={enter}
            startIcon={<GoogleMark />}
            sx={{
              height: 48,
              borderColor: 'divider',
              color: 'text.primary',
              bgcolor: 'rgba(255,255,255,0.55)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.78)', borderColor: 'divider' },
            }}
          >
            Continuar con Google
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={enter}
            startIcon={<MicrosoftMark />}
            sx={{
              height: 48,
              borderColor: 'divider',
              color: 'text.primary',
              bgcolor: 'rgba(255,255,255,0.55)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.78)', borderColor: 'divider' },
            }}
          >
            Continuar con Microsoft
          </Button>
        </Stack>

        <Divider sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
            o con correo
          </Typography>
        </Divider>

        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            enter()
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

function GoogleMark() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function MicrosoftMark() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  )
}
