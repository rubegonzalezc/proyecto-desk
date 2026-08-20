'use client'

import CloseRounded from '@mui/icons-material/CloseRounded'
import HeadsetMicOutlined from '@mui/icons-material/HeadsetMicOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import { Box, IconButton, Typography } from '@mui/material'
import { getSystemById, type SystemId } from '@/shared/systems'
import { useWorkspace } from './WorkspaceProvider'

const icons: Record<SystemId, typeof HeadsetMicOutlined> = {
  helpdesk: HeadsetMicOutlined,
  inventario: Inventory2Outlined,
}

export default function SystemTabs() {
  const { activeId, openIds, openSystem, closeSystem } = useWorkspace()

  if (openIds.length < 2) return null

  return (
    <Box
      className="liquid-glass"
      sx={{
        mt: 1,
        px: 1,
        py: 0.7,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: 0.6,
        overflowX: 'auto',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 0.6, minWidth: 0 }}>
        {openIds.map((id) => {
          const system = getSystemById(id)
          const active = id === activeId
          const Icon = icons[id]
          return (
            <Box
              key={id}
              className="press-feedback"
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
                pl: 0.35,
                pr: id === 'helpdesk' ? 0.45 : 0.2,
                borderRadius: '14px',
                background: active ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.65)' : 'none',
                color: active ? 'text.primary' : 'text.secondary',
                transition: 'background 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                '&:hover': {
                  background: active ? 'rgba(37, 99, 235, 0.16)' : 'rgba(15, 23, 42, 0.04)',
                },
              }}
            >
              <Box
                component="button"
                type="button"
                className="sd-system-tab"
                onClick={() => openSystem(id)}
                aria-label={`Cambiar a ${system.name}`}
                aria-current={active ? 'true' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.9,
                  border: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'inherit',
                  height: '100%',
                  pl: 0.8,
                  pr: 0.55,
                  borderRadius: '14px',
                }}
              >
                <Icon sx={{ fontSize: 18, color: active ? 'primary.main' : 'text.secondary' }} />
                <Typography sx={{ fontSize: 13.5, fontWeight: active ? 750 : 600, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                  {system.shortName}
                </Typography>
              </Box>
              {id !== 'helpdesk' ? (
                <IconButton
                  size="small"
                  aria-label={`Cerrar ${system.shortName}`}
                  onClick={() => closeSystem(id)}
                  sx={{ width: 24, height: 24 }}
                >
                  <CloseRounded sx={{ fontSize: 16 }} />
                </IconButton>
              ) : null}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
