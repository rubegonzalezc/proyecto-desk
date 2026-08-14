'use client'

import { DarkModeOutlined, LightModeOutlined, NotificationsNoneOutlined, SearchRounded } from '@mui/icons-material'
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { notifications } from '@/shared/mock/notifications'
import { getSystemById } from '@/shared/systems'
import { useThemeMode } from '@/theme/ThemeModeProvider'
import UserAvatar from '@/components/ui/UserAvatar'
import TenantSwitcher from './TenantSwitcher'
import { useWorkspace } from './WorkspaceProvider'
import { platformOperator } from '@/shared/mock/tenants'

export default function Header({ onMenu }: { onMenu: () => void }) {
  const { mode, toggleMode } = useThemeMode()
  const { activeId } = useWorkspace()
  const system = getSystemById(activeId)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null)
  const unread = notifications.filter((item) => item.unread).length

  return (
    <Box
      className="liquid-glass floating-header"
      sx={{
        height: { xs: 64, md: 72 },
        display: 'flex',
        alignItems: 'center',
        px: { xs: 1.25, md: 2 },
        gap: 1.25,
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', width: '100%', gap: 1.25 }}>
        <IconButton onClick={onMenu} sx={{ display: { md: 'none' } }} aria-label="Abrir menú">
          <Box sx={{ width: 18, height: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ height: 2, bgcolor: 'text.primary', borderRadius: 99 }} />
            <Box sx={{ height: 2, width: '70%', bgcolor: 'text.primary', borderRadius: 99 }} />
            <Box sx={{ height: 2, bgcolor: 'text.primary', borderRadius: 99 }} />
          </Box>
        </IconButton>

        <TenantSwitcher />

        <TextField
          placeholder={system.searchPlaceholder}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 520,
            display: { xs: 'none', sm: 'block' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              height: 44,
              background: 'rgba(255,255,255,0.55)',
            },
          }}
        />

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton onClick={toggleMode} aria-label="Cambiar tema">
            {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} aria-label="Notificaciones">
            <Badge color="error" badgeContent={unread} overlap="circular">
              <NotificationsNoneOutlined />
            </Badge>
          </IconButton>
          <Stack
            direction="row"
            spacing={1.1}
            alignItems="center"
            onClick={(event) => setProfileEl(event.currentTarget)}
            sx={{ ml: 0.75, display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
          >
            <UserAvatar name="Elena Ruiz" initials="ER" size={34} />
            <Box sx={{ lineHeight: 1.15 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {platformOperator.adminName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {platformOperator.adminRole}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: { width: 340, mt: 1.5, borderRadius: '20px', p: 0.5 },
          },
        }}
      >
        {notifications.map((item) => (
          <MenuItem key={item.id} onClick={() => setAnchorEl(null)} sx={{ alignItems: 'flex-start', py: 1.25, borderRadius: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: item.unread ? 750 : 600 }}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', whiteSpace: 'normal' }}>
                {item.detail}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {item.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={profileEl}
        open={Boolean(profileEl)}
        onClose={() => setProfileEl(null)}
        slotProps={{ paper: { sx: { width: 220, mt: 1.5, borderRadius: '16px', p: 0.5 } } }}
      >
        <MenuItem component={Link} href="/login" onClick={() => setProfileEl(null)} sx={{ borderRadius: 2 }}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  )
}
