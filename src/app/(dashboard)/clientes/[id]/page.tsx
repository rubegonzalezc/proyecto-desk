import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { platformOperator, tenants } from '@/shared/mock/tenants'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import PageHeader from '@/components/ui/PageHeader'
import TenantLogo from '@/components/brand/TenantLogo'
import ClientDetailBreadcrumbs from '@/components/clientes/ClientDetailBreadcrumbs'

export const metadata: Metadata = {
  title: 'Cliente',
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tenant = tenants.find((item) => item.id === id)
  if (!tenant) notFound()

  return (
    <Box>
      <ClientDetailBreadcrumbs clientId={tenant.id} clientName={tenant.name} />
      <PageHeader
        eyebrow={tenant.id}
        title={tenant.name}
        description={`Tenant contratado. Consola de ${platformOperator.name}.`}
        extra={
          <LinkButton href="/clientes" variant="outlined">
            Volver a clientes
          </LinkButton>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppCard lift={false}>
            <Stack spacing={2} alignItems="flex-start">
              <TenantLogo logo={tenant.logo} name={tenant.name} size={56} />
              <div>
                <Typography variant="h4">{tenant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tenant.domain}
                </Typography>
              </div>
              <Chip size="small" label={tenant.status} color={tenant.status === 'Activo' ? 'success' : 'warning'} />
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contrato
            </Typography>
            <Grid container spacing={2}>
              <Meta label="Plan" value={tenant.plan} />
              <Meta label="Alta" value={tenant.contractedAt} />
              <Meta label="Región" value={tenant.region} />
              <Meta label="Usuarios" value={String(tenant.users)} />
              <Meta label="Tickets abiertos" value={String(tenant.ticketsOpen)} />
              <Meta label="Sistemas" value={tenant.systems.join(', ')} />
              <Meta label="Admin del cliente" value={tenant.adminName} />
              <Meta label="Correo" value={tenant.adminEmail} />
            </Grid>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Grid>
  )
}
