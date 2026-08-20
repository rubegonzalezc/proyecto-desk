import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import { listSuppliers } from '@/lib/api/inventory'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'
import UserAvatar from '@/components/ui/UserAvatar'

export const metadata: Metadata = {
  title: 'Proveedores',
}

const columns = [
  { key: 'name', label: 'Proveedor', width: '1.3fr' },
  { key: 'contact', label: 'Contacto' },
  { key: 'lead', label: 'Lead time', width: '140px' },
  { key: 'status', label: 'Estado', width: '150px' },
]

export default async function SuppliersPage() {
  const suppliers = await listSuppliers()

  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="catálogo" />}
        title="Proveedores"
        description="Abastecimiento de hardware, consumibles y recambios."
      />
      <AppTable columns={columns}>
        {suppliers.map((supplier) => (
          <Stack
            key={supplier.id}
            className="app-table-row"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr 140px 150px',
              alignItems: 'center',
              px: 2.25,
              py: 1.5,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minWidth: 860,
            }}
          >
            <div>
              <Typography sx={{ fontWeight: 700 }}>{supplier.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {supplier.id}
              </Typography>
            </div>
            <Stack direction="row" spacing={1.1} alignItems="center">
              <UserAvatar name={supplier.contact} size={28} />
              <div>
                <Typography variant="body2">{supplier.contact}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {supplier.email}
                </Typography>
              </div>
            </Stack>
            <Typography variant="body2">{supplier.leadTime}</Typography>
            <Chip
              size="small"
              label={supplier.status}
              color={supplier.status === 'Activo' ? 'success' : 'warning'}
              variant="outlined"
            />
          </Stack>
        ))}
      </AppTable>
    </>
  )
}
