'use client'

import type { ReactNode } from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import type { InventoryItem } from '@/shared/types/inventory'

const statusColor: Record<InventoryItem['status'], 'success' | 'warning' | 'error'> = {
  Disponible: 'success',
  'Stock bajo': 'warning',
  Agotado: 'error',
}

export default function InventoryItemRow({ item }: { item: InventoryItem }) {
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
            {item.sku}
          </Typography>
          <Chip size="small" label={item.status} color={statusColor[item.status]} variant="outlined" />
        </Stack>
        <BoxMeta>
          <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {item.category} · {item.warehouse}
          </Typography>
        </BoxMeta>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {item.stock} {item.unit}
        </Typography>
      </Stack>

      <Stack
        className="app-table-row"
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '120px 1.4fr 1fr 100px 140px',
          alignItems: 'center',
          px: 2.25,
          py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {item.sku}
        </Typography>
        <BoxMeta>
          <Typography sx={{ fontWeight: 700 }} noWrap>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {item.category}
          </Typography>
        </BoxMeta>
        <Typography variant="body2" noWrap>
          {item.warehouse}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {item.stock} {item.unit}
        </Typography>
        <Chip size="small" label={item.status} color={statusColor[item.status]} variant="outlined" />
      </Stack>
    </>
  )
}

function BoxMeta({ children }: { children: ReactNode }) {
  return <div style={{ minWidth: 0 }}>{children}</div>
}
