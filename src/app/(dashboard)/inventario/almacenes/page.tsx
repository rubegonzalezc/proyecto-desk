import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { warehouses } from '@/shared/mock/inventory'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Almacenes',
}

export default function WarehousesPage() {
  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="catálogo" />}
        title="Almacenes"
        description="Ubicaciones físicas y kits de terreno."
      />
      <Grid2 container spacing={2.25} className="stagger">
        {warehouses.map((warehouse) => (
          <Grid2 key={warehouse.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <AppCard sx={{ height: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
                <Typography variant="h4">{warehouse.name}</Typography>
                <Chip size="small" label={warehouse.status} variant="outlined" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                {warehouse.location}
              </Typography>
              <Grid2 container spacing={1.5}>
                <Meta label="Responsable" value={warehouse.manager} />
                <Meta label="SKUs" value={String(warehouse.skus)} />
                <Meta label="Ocupación" value={warehouse.capacity} />
                <Meta label="ID" value={warehouse.id} />
              </Grid2>
            </AppCard>
          </Grid2>
        ))}
      </Grid2>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Grid2 size={{ xs: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Grid2>
  )
}
