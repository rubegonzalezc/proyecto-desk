'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SvgIconComponent } from '@mui/icons-material'
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined'
import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import DevicesOutlined from '@mui/icons-material/DevicesOutlined'
import GroupsOutlined from '@mui/icons-material/GroupsOutlined'
import HeadsetMicOutlined from '@mui/icons-material/HeadsetMicOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import PeopleOutline from '@mui/icons-material/PeopleOutline'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined'
import ShieldOutlined from '@mui/icons-material/ShieldOutlined'
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined'
import WarehouseOutlined from '@mui/icons-material/WarehouseOutlined'
import { Box, Stack, Typography } from '@mui/material'
import PrototypeBadge from './PrototypeBadge'
import TenantLogo from '@/components/brand/TenantLogo'
import UserAvatar from '@/components/ui/UserAvatar'
import { useTenant } from './TenantProvider'
import { useWorkspace } from './WorkspaceProvider'
import { platformOperator } from '@/shared/mock/tenants'
import {
  appSystems,
  getSystemById,
  isNavItemActive,
  type NavIconName,
  type SystemId,
} from '@/shared/systems'

const navIcons: Record<NavIconName, SvgIconComponent> = {
  dashboard: DashboardOutlined,
  tickets: AssignmentOutlined,
  users: PeopleOutline,
  roles: ShieldOutlined,
  teams: GroupsOutlined,
  assets: DevicesOutlined,
  knowledge: MenuBookOutlined,
  settings: SettingsOutlined,
  items: Inventory2Outlined,
  warehouses: WarehouseOutlined,
  moves: SwapHorizOutlined,
  suppliers: LocalShippingOutlined,
  tenants: ApartmentOutlined,
}

const systemIcons: Record<SystemId, SvgIconComponent> = {
  helpdesk: HeadsetMicOutlined,
  inventario: Inventory2Outlined,
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { activeId, openSystem } = useWorkspace()
  const { tenant } = useTenant()
  const system = getSystemById(activeId)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#F8FAFC',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 18%), linear-gradient(180deg, #111827 0%, #0B1220 55%, #020617 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          width: 220,
          height: 220,
          top: -80,
          left: -60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, px: 1.75, pt: 2.25, pb: 1.25 }}>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ px: 0.5, mb: 1.35 }}>
          <TenantLogo logo={tenant.logo} name={tenant.name} size={38} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 750, letterSpacing: '-0.045em', lineHeight: 1.1 }} noWrap>
              {tenant.name}
            </Typography>
            <Typography noWrap sx={{ fontSize: 11, color: 'rgba(248,250,252,0.52)', fontWeight: 600 }}>
              {system.shortName}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            mx: 0.25,
            px: 1.1,
            py: 0.7,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Typography sx={{ fontSize: 10, fontWeight: 750, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)' }}>
            Operado por
          </Typography>
          <Typography sx={{ fontSize: 12.5, fontWeight: 720, letterSpacing: '-0.02em' }}>
            {platformOperator.name}
          </Typography>
        </Box>
      </Box>

      <Box
        className="sd-scrollbar"
        sx={{ position: 'relative', zIndex: 1, flex: 1, overflowY: 'auto', px: 1.25, pb: 1 }}
      >
        {system.groups.map((group) => (
          <NavSection key={group.id} label={group.label}>
            {group.items.map((item) => {
              const active = isNavItemActive(pathname, item.href, system.home)
              const Icon = navIcons[item.icon]
              return (
                <NavRow
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={Icon}
                  badge={item.badge}
                  active={active}
                  onClick={onNavigate}
                />
              )
            })}
          </NavSection>
        ))}

        <NavSection label="Sistemas">
          {appSystems.map((item) => {
            const Icon = systemIcons[item.id]
            const active = item.id === activeId
            return (
              <NavRow
                key={item.id}
                label={item.name}
                icon={Icon}
                active={active}
                onClick={() => {
                  openSystem(item.id)
                  onNavigate?.()
                }}
              />
            )
          })}
        </NavSection>

        <NavSection label="Plataforma">
          <NavRow
            href="/clientes"
            label="Clientes"
            icon={ApartmentOutlined}
            active={pathname === '/clientes' || pathname.startsWith('/clientes/')}
            onClick={onNavigate}
          />
        </NavSection>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, px: 1.35, pb: 1.5, pt: 0.5 }}>
        <Box
          sx={{
            p: 1.15,
            mb: 1.1,
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Stack direction="row" spacing={1.1} alignItems="center">
            <UserAvatar name="Elena Ruiz" initials="ER" size={32} />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 720, letterSpacing: '-0.02em' }} noWrap>
                {platformOperator.adminName}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(248,250,252,0.5)' }} noWrap>
                {platformOperator.name} · plataforma
              </Typography>
            </Box>
          </Stack>
        </Box>
        <PrototypeBadge />
      </Box>
    </Box>
  )
}

function NavSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box sx={{ mb: 2.1 }}>
      <Typography
        sx={{
          px: 1.35,
          mb: 0.7,
          fontSize: 10.5,
          fontWeight: 750,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(248,250,252,0.38)',
        }}
      >
        {label}
      </Typography>
      <Stack spacing={0.4}>{children}</Stack>
    </Box>
  )
}

function NavRow({
  href,
  label,
  icon: Icon,
  badge,
  active,
  onClick,
}: {
  href?: string
  label: string
  icon: SvgIconComponent
  badge?: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <Box
      component={href ? Link : 'button'}
      href={href}
      type={href ? undefined : 'button'}
      onClick={onClick}
      className="nav-pill"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.1,
        width: '100%',
        px: 0.85,
        py: 0.7,
        pr: 1.1,
        border: 0,
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: '16px',
        textDecoration: 'none',
        color: active ? '#FFFFFF' : 'rgba(248,250,252,0.72)',
        background: active
          ? 'linear-gradient(90deg, rgba(37,99,235,0.38) 0%, rgba(37,99,235,0.14) 100%)'
          : 'transparent',
        boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.12)' : 'none',
        '&:hover': {
          background: active
            ? 'linear-gradient(90deg, rgba(37,99,235,0.46) 0%, rgba(37,99,235,0.2) 100%)'
            : 'rgba(255,255,255,0.05)',
        },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          bgcolor: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)',
          color: active ? '#93C5FD' : 'rgba(248,250,252,0.7)',
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: 13.5,
          fontWeight: active ? 720 : 560,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>
      {badge ? (
        <Box
          sx={{
            minWidth: 22,
            height: 20,
            px: 0.7,
            borderRadius: '999px',
            display: 'grid',
            placeItems: 'center',
            fontSize: 11,
            fontWeight: 750,
            bgcolor: active ? 'rgba(255,255,255,0.16)' : 'rgba(37,99,235,0.28)',
            color: '#DBEAFE',
          }}
        >
          {badge}
        </Box>
      ) : null}
    </Box>
  )
}
