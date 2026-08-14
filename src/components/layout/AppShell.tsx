'use client'

import { useState, type ReactNode } from 'react'
import { Box, Drawer } from '@mui/material'
import { useThemeMode } from '@/theme/ThemeModeProvider'
import Header from './Header'
import Sidebar from './Sidebar'
import SystemTabs from './SystemTabs'
import { TenantProvider } from './TenantProvider'
import { WorkspaceProvider } from './WorkspaceProvider'

const SIDEBAR_WIDTH = 276

export default function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { mode } = useThemeMode()

  return (
    <WorkspaceProvider>
      <TenantProvider>
      <Box data-theme={mode} className="ice-wash" sx={{ minHeight: '100vh', display: 'flex' }}>
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: 0,
            height: '100vh',
            p: 1.25,
            pr: 0,
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(2, 6, 23, 0.28)',
            }}
          >
            <Sidebar />
          </Box>
        </Box>

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              bgcolor: 'transparent',
              backgroundImage: 'none',
              boxShadow: 'none',
              p: 1.25,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Sidebar onNavigate={() => setOpen(false)} />
          </Box>
        </Drawer>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 20, p: { xs: 1.25, md: 1.75 }, pb: 0 }}>
            <Header onMenu={() => setOpen(true)} />
            <SystemTabs />
          </Box>
          <Box
            component="main"
            sx={{
              flex: 1,
              px: { xs: 1.75, md: 3.5 },
              py: { xs: 2.5, md: 3.5 },
              maxWidth: 1440,
              width: '100%',
              mx: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      </TenantProvider>
    </WorkspaceProvider>
  )
}
