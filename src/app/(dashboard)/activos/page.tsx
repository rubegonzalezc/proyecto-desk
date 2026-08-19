import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import PrintOutlined from '@mui/icons-material/PrintOutlined'
import RouterOutlined from '@mui/icons-material/RouterOutlined'
import HubOutlined from '@mui/icons-material/HubOutlined'
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined'
import type { AssetType } from '@/shared/types/asset'
import { assets } from '@/shared/mock/assets'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Activos TI',
}

const columns = [
  { key: 'asset', label: 'Activo', width: '1.5fr' },
  { key: 'type', label: 'Tipo', width: '140px' },
  { key: 'serial', label: 'Serie' },
  { key: 'assignee', label: 'Asignado' },
  { key: 'status', label: 'Estado', width: '160px' },
]

const typeIcon: Record<AssetType, typeof ComputerOutlined> = {
  Equipo: ComputerOutlined,
  Impresora: PrintOutlined,
  Router: RouterOutlined,
  Switch: HubOutlined,
  Licencia: VpnKeyOutlined,
}

const statusColor: Record<string, 'success' | 'warning' | 'default' | 'info'> = {
  Operativo: 'success',
  'En mantenimiento': 'warning',
  Retirado: 'default',
  Asignado: 'info',
}

export default function AssetsPage() {
  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="activos TI" />}
        title="Activos TI"
        description="Equipos, impresoras, red y licencias. Vista de catálogo para demos."
      />
      <AppTable columns={columns}>
        {assets.map((asset) => {
          const Icon = typeIcon[asset.type]
          return (
            <Stack
              key={asset.id}
              className="app-table-row"
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 140px 1fr 1fr 160px',
                alignItems: 'center',
                px: 2.25,
                py: 1.5,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                minWidth: 860,
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Icon fontSize="small" color="primary" />
                <div>
                  <Typography sx={{ fontWeight: 700 }}>{asset.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {asset.id} · {asset.location}
                  </Typography>
                </div>
              </Stack>
              <Typography variant="body2">{asset.type}</Typography>
              <Typography variant="body2">{asset.serial}</Typography>
              <Typography variant="body2">{asset.assignee}</Typography>
              <Chip size="small" label={asset.status} color={statusColor[asset.status]} variant="outlined" />
            </Stack>
          )
        })}
      </AppTable>
    </>
  )
}
