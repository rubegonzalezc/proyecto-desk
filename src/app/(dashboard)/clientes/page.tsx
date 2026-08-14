import type { Metadata } from 'next'
import Link from 'next/link'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { tenants } from '@/shared/mock/tenants'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'
import TenantLogo from '@/components/brand/TenantLogo'

export const metadata: Metadata = {
  title: 'Clientes',
}

const columns = [
  { key: 'tenant', label: 'Cliente', width: '1.4fr' },
  { key: 'plan', label: 'Plan', width: '120px' },
  { key: 'systems', label: 'Sistemas' },
  { key: 'users', label: 'Usuarios', width: '110px' },
  { key: 'status', label: 'Estado', width: '130px' },
]

const statusColor: Record<string, 'success' | 'warning' | 'default'> = {
  Activo: 'success',
  Onboarding: 'warning',
  Suspendido: 'default',
}

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="SynchroDev · plataforma"
        title="Clientes"
        description="Empresas que tienen contratado SynchroDesk. Esta consola es del administrador de la plataforma."
      />
      <AppTable columns={columns}>
        {tenants.map((tenant) => (
          <Link
            key={tenant.id}
            href={`/clientes/${tenant.id}`}
            className="app-table-row"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 120px 1fr 110px 130px',
                alignItems: 'center',
                px: 2.25,
                py: 1.5,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                minWidth: 900,
              }}
            >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <TenantLogo logo={tenant.logo} name={tenant.name} size={32} />
              <div>
                <Typography sx={{ fontWeight: 750 }}>{tenant.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {tenant.domain}
                </Typography>
              </div>
            </Stack>
            <Typography variant="body2">{tenant.plan}</Typography>
            <Typography variant="body2">{tenant.systems.join(' · ')}</Typography>
            <Typography variant="body2">{tenant.users}</Typography>
            <Chip size="small" label={tenant.status} color={statusColor[tenant.status]} variant="outlined" />
            </Box>
          </Link>
        ))}
      </AppTable>
    </>
  )
}
