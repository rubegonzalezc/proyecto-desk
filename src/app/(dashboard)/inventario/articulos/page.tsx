import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import { inventoryItems } from '@/shared/mock/inventory'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Artículos',
}

const columns = [
  { key: 'sku', label: 'SKU', width: '120px' },
  { key: 'name', label: 'Artículo', width: '1.4fr' },
  { key: 'wh', label: 'Almacén' },
  { key: 'stock', label: 'Stock', width: '100px' },
  { key: 'status', label: 'Estado', width: '140px' },
]

const statusColor: Record<string, 'success' | 'warning' | 'error'> = {
  Disponible: 'success',
  'Stock bajo': 'warning',
  Agotado: 'error',
}

export default function InventoryItemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Artículos"
        description="Stock por SKU. Datos de demostración, sin persistencia."
      />
      <AppTable columns={columns}>
        {inventoryItems.map((item) => (
          <Stack
            key={item.sku}
            className="app-table-row"
            sx={{
              display: 'grid',
              gridTemplateColumns: '120px 1.4fr 1fr 100px 140px',
              alignItems: 'center',
              px: 2.25,
              py: 1.5,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minWidth: 860,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {item.sku}
            </Typography>
            <div>
              <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.category}
              </Typography>
            </div>
            <Typography variant="body2">{item.warehouse}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {item.stock} {item.unit}
            </Typography>
            <Chip size="small" label={item.status} color={statusColor[item.status]} variant="outlined" />
          </Stack>
        ))}
      </AppTable>
    </>
  )
}
