import type { Metadata } from 'next'
import Link from 'next/link'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { roles, countGranted, systemsWithAccess } from '@/shared/mock/roles'
import AppTable from '@/components/ui/AppTable'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Roles y permisos',
}

const columns = [
  { key: 'role', label: 'Rol' },
  { key: 'desc', label: 'Descripción', width: '1.6fr' },
  { key: 'users', label: 'Usuarios', width: '120px' },
  { key: 'scope', label: 'Alcance', width: '280px' },
]

export default function RolesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gobierno"
        title="Roles y permisos"
        description="Permisos por sistema y módulo. Edición visual, sin persistencia."
        actionLabel="Crear rol"
        actionHref="/roles/nuevo"
      />
      <AppTable columns={columns}>
        {roles.map((role) => {
          const granted = countGranted(role.permissions)
          const systems = systemsWithAccess(role.permissions)
          return (
            <Link
              key={role.id}
              href={`/roles/${role.id}`}
              className="app-table-row"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.6fr 120px 280px',
                  px: 2.25,
                  py: 1.7,
                  bgcolor: 'background.paper',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  minWidth: 860,
                }}
              >
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: role.color }} />
                <Typography sx={{ fontWeight: 750 }}>{role.name}</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {role.description}
              </Typography>
              <Typography variant="body2">{role.usersCount}</Typography>
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {systems.length === 0 ? (
                  <Chip size="small" label="Sin sistemas" variant="outlined" />
                ) : (
                  systems.map((system) => (
                    <Chip key={system} size="small" label={system} variant="outlined" />
                  ))
                )}
                <Chip size="small" label={`${granted} permisos`} />
              </Stack>
              </Box>
            </Link>
          )
        })}
      </AppTable>
    </>
  )
}
