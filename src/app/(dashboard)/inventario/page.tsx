import type { Metadata } from 'next'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined'
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined'
import WarehouseOutlined from '@mui/icons-material/WarehouseOutlined'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { inventoryItems, inventoryKpis, inventoryMovements } from '@/shared/mock/inventory'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'

export const metadata: Metadata = {
  title: 'Inventario',
}

const icons = {
  skus: <Inventory2Outlined fontSize="small" />,
  low: <WarningAmberOutlined fontSize="small" />,
  value: <WarehouseOutlined fontSize="small" />,
  moves: <SwapHorizOutlined fontSize="small" />,
}

export default function InventoryDashboardPage() {
  const lowStock = inventoryItems.filter((item) => item.status !== 'Disponible')

  return (
    <Box>
      <PageHeader
        eyebrow="Sistema de inventario"
        title="Stock y abastecimiento"
        description="Vista operativa de artículos, alertas de reposición y movimientos del día."
      />

      <Grid container spacing={2.25} className="stagger" sx={{ mb: 3.5 }}>
        {inventoryKpis.map((kpi) => (
          <Grid key={kpi.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              tone={kpi.tone}
              icon={icons[kpi.id as keyof typeof icons]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.25}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <AppCard lift={false} variant="solid" sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h4">Movimientos recientes</Typography>
            </Box>
            {inventoryMovements.slice(0, 5).map((move) => (
              <Stack
                key={move.id}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                className="app-table-row"
                sx={{
                  px: 2.25,
                  py: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{move.item}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {move.id} · {move.from} → {move.to}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={move.type} variant="outlined" />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {move.quantity > 0 ? `+${move.quantity}` : move.quantity}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Reponer ahora
            </Typography>
            <Stack spacing={1.5}>
              {lowStock.map((item) => (
                <Stack key={item.sku} direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700 }} noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.sku} · mín. {item.min}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={item.status}
                    color={item.status === 'Agotado' ? 'error' : 'warning'}
                    variant="outlined"
                  />
                </Stack>
              ))}
            </Stack>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
