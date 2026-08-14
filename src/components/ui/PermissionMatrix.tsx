'use client'

import { useMemo, useState } from 'react'
import { Box, Checkbox, Typography } from '@mui/material'
import type { PermissionAction, PermissionModule, Role } from '@/shared/types/role'
import { permissionActions, permissionGroups, permissionModules } from '@/shared/mock/roles'

type PermissionMatrixProps = {
  initial?: Role['permissions']
}

export default function PermissionMatrix({ initial }: PermissionMatrixProps) {
  const seed = useMemo(() => {
    const next = {} as Role['permissions']
    for (const moduleItem of permissionModules) {
      next[moduleItem.key] = [...(initial?.[moduleItem.key] ?? [])]
    }
    return next
  }, [initial])

  const [matrix, setMatrix] = useState<Role['permissions']>(seed)

  const toggle = (moduleKey: PermissionModule, action: PermissionAction) => {
    setMatrix((current) => {
      const list = current[moduleKey] ?? []
      const exists = list.includes(action)
      return {
        ...current,
        [moduleKey]: exists ? list.filter((item) => item !== action) : [...list, action],
      }
    })
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {permissionGroups.map((group) => (
        <Box key={group.id} className="liquid-glass" sx={{ p: { xs: 1.5, md: 2 }, overflow: 'hidden' }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ px: 0.5, mb: 1.5 }}>
              <Typography variant="h4">{group.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {group.description}
              </Typography>
            </Box>
            <Box sx={{ overflowX: 'auto' }} className="sd-scrollbar">
              <Box
                sx={{
                  minWidth: 760,
                  bgcolor: 'background.paper',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `220px repeat(${permissionActions.length}, 1fr)`,
                    px: 1.5,
                    py: 1.25,
                    bgcolor: 'rgba(238, 243, 250, 0.85)',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    Módulo
                  </Typography>
                  {permissionActions.map((action) => (
                    <Typography
                      key={action.key}
                      variant="caption"
                      sx={{ fontWeight: 700, color: 'text.secondary', textAlign: 'center' }}
                    >
                      {action.label}
                    </Typography>
                  ))}
                </Box>
                {group.modules.map((moduleItem) => (
                  <Box
                    key={moduleItem.key}
                    className="app-table-row"
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: `220px repeat(${permissionActions.length}, 1fr)`,
                      px: 1.5,
                      py: 0.5,
                      alignItems: 'center',
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 650 }}>
                        {moduleItem.label}
                      </Typography>
                      {moduleItem.hint ? (
                        <Typography variant="caption" color="text.secondary">
                          {moduleItem.hint}
                        </Typography>
                      ) : null}
                    </Box>
                    {permissionActions.map((action) => (
                      <Box key={action.key} sx={{ display: 'grid', placeItems: 'center' }}>
                        <Checkbox
                          size="small"
                          checked={(matrix[moduleItem.key] ?? []).includes(action.key)}
                          onChange={() => toggle(moduleItem.key, action.key)}
                        />
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
