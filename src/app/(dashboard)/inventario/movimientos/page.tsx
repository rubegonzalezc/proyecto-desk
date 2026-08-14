import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import { inventoryMovements } from '@/shared/mock/inventory'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Movimientos',
}

const columns = [
  { key: 'id', label: 'ID', width: '110px' },
  { key: 'type', label: 'Tipo', width: '120px' },
  { key: 'item', label: 'Artículo', width: '1.4fr' },
  { key: 'qty', label: 'Cant.', width: '80px' },
  { key: 'route', label: 'Origen / destino' },
  { key: 'date', label: 'Fecha', width: '150px' },
]

export default function InventoryMovesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operación"
        title="Movimientos"
        description="Entradas, salidas, traslados y ajustes. Solo visualización."
      />
      <AppTable columns={columns}>
        {inventoryMovements.map((move) => (
          <Stack
            key={move.id}
            className="app-table-row"
            sx={{
              display: 'grid',
              gridTemplateColumns: '110px 120px 1.4fr 80px 1fr 150px',
              alignItems: 'center',
              px: 2.25,
              py: 1.5,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minWidth: 920,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {move.id}
            </Typography>
            <Chip size="small" label={move.type} variant="outlined" />
            <div>
              <Typography sx={{ fontWeight: 700 }}>{move.item}</Typography>
              <Typography variant="caption" color="text.secondary">
                {move.sku} · {move.user}
              </Typography>
            </div>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {move.quantity}
            </Typography>
            <Typography variant="body2">
              {move.from} → {move.to}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {move.createdAt}
            </Typography>
          </Stack>
        ))}
      </AppTable>
    </>
  )
}
