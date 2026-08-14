'use client'

import type { ReactNode } from 'react'
import { Box, IconButton } from '@mui/material'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { useThemeMode } from '@/theme/ThemeModeProvider'

export default function AuthShell({ children }: { children: ReactNode }) {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Box data-theme={mode} className="ice-wash" sx={{ minHeight: '100vh', position: 'relative' }}>
      <IconButton
        onClick={toggleMode}
        aria-label="Cambiar tema"
        sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          zIndex: 2,
          bgcolor: mode === 'light' ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(16px)',
          '&:hover': {
            bgcolor: mode === 'light' ? 'rgba(255,255,255,0.62)' : 'rgba(15,23,42,0.75)',
          },
        }}
      >
        {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
      {children}
    </Box>
  )
}
