'use client'

import type { ReactNode } from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import type { InventoryMovement } from '@/shared/types/inventory'

export default function InventoryMovementRow({ movement }: { movement: InventoryMovement }) {
  return (
    <>
      <Stack
        className="app-table-row"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 1,
          px: 2.25,
          py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {movement.id}
          </Typography>
          <Chip size="small" label={movement.type} variant="outlined" />
        </Stack>
        <BoxMeta>
          <Typography sx={{ fontWeight: 700 }}>{movement.item}</Typography>
          <Typography variant="caption" color="text.secondary">
            {movement.sku} · {movement.user}
          </Typography>
        </BoxMeta>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          Cantidad · {movement.quantity}
        </Typography>
        <Typography variant="body2">
          {movement.from} → {movement.to}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {movement.createdAt}
        </Typography>
      </Stack>

      <Stack
        className="app-table-row"
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '110px 120px 1.4fr 80px 1fr 150px',
          alignItems: 'center',
          px: 2.25,
          py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {movement.id}
        </Typography>
        <Chip size="small" label={movement.type} variant="outlined" />
        <BoxMeta>
          <Typography sx={{ fontWeight: 700 }} noWrap>
            {movement.item}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {movement.sku} · {movement.user}
          </Typography>
        </BoxMeta>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {movement.quantity}
        </Typography>
        <Typography variant="body2" noWrap>
          {movement.from} → {movement.to}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {movement.createdAt}
        </Typography>
      </Stack>
    </>
  )
}

function BoxMeta({ children }: { children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>{children}</div>
}
