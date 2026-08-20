'use client'

import { DarkModeOutlined, LightModeOutlined, NotificationsNoneOutlined, SearchRounded } from '@mui/icons-material'
import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { getNotificationHref } from '@/lib/api/notifications'
import { useNotifications } from '@/stores/NotificationsProvider'
import { useThemeMode } from '@/theme/ThemeModeProvider'
import UserAvatar from '@/components/ui/UserAvatar'
import HeaderSearch from './HeaderSearch'
import { useCommandPalette } from './CommandPaletteProvider'
import TenantSwitcher from './TenantSwitcher'
import { getPlatformOperator } from '@/lib/api/tenants'

const platformOperator = getPlatformOperator()

export default function Header({ onMenu }: { onMenu: () => void }) {
  const { mode, toggleMode } = useThemeMode()
  const { openPalette } = useCommandPalette()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null)

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

        <HeaderSearch />

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            onClick={openPalette}
            aria-label="Abrir búsqueda rápida (Cmd+K)"
            sx={{ display: { sm: 'none' } }}
          >
            <SearchRounded />
          </IconButton>
          <IconButton
            onClick={toggleMode}
            aria-label={mode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            aria-label={
              unreadCount > 0
                ? `Notificaciones, ${unreadCount} sin leer`
                : 'Notificaciones'
            }
          >
            <Badge color="error" badgeContent={unreadCount > 0 ? unreadCount : undefined} overlap="circular">
              <NotificationsNoneOutlined />
            </Badge>
          </IconButton>
          <Box
            component="button"
            type="button"
            onClick={(event) => setProfileEl(event.currentTarget)}
            aria-label="Abrir menú de perfil de usuario"
            aria-haspopup="menu"
            sx={{
              ml: 0.75,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.1,
              border: 0,
              p: 0.5,
              borderRadius: '16px',
              cursor: 'pointer',
              bgcolor: 'transparent',
              color: 'inherit',
              font: 'inherit',
              textAlign: 'left',
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
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
          </Box>
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
        <Box
          sx={{
            px: 1.5,
            py: 1.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 750 }}>
            Notificaciones
          </Typography>
          {unreadCount > 0 ? (
            <Button
              size="small"
              onClick={() => markAllAsRead()}
              sx={{ minWidth: 0, whiteSpace: 'nowrap', fontSize: 12 }}
            >
              Marcar todas como leídas
            </Button>
          ) : null}
        </Box>
        {notifications.map((item) => (
          <MenuItem
            key={item.id}
            component={Link}
            href={getNotificationHref(item)}
            onClick={() => {
              markAsRead(item.id)
              setAnchorEl(null)
            }}
            sx={{
              alignItems: 'flex-start',
              py: 1.25,
              borderRadius: 2,
              bgcolor: item.unread ? 'action.hover' : 'transparent',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                {item.unread ? (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      mt: 0.75,
                      borderRadius: '50%',
                      bgcolor: 'error.main',
                      flexShrink: 0,
                    }}
                  />
                ) : null}
                <Box sx={{ flex: 1, minWidth: 0 }}>
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
              </Stack>
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
