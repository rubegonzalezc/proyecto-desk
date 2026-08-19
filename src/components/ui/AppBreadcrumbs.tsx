'use client'

import Link from 'next/link'
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded'
import { Breadcrumbs, Typography } from '@mui/material'
import { useTenant } from '@/components/layout/TenantProvider'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type AppBreadcrumbsProps = {
  items: BreadcrumbItem[]
  /** Antepone el tenant activo con enlace al dashboard. */
  showActiveTenant?: boolean
}

export default function AppBreadcrumbs({ items, showActiveTenant = false }: AppBreadcrumbsProps) {
  const { tenant } = useTenant()

  const crumbs: BreadcrumbItem[] = showActiveTenant
    ? [{ label: tenant.name, href: '/dashboard' }, ...items]
    : items

  return (
    <Breadcrumbs
      separator={<NavigateNextRounded sx={{ fontSize: 16, color: 'text.disabled' }} />}
      aria-label="Ruta de navegación"
      sx={{ mb: 1.75 }}
    >
      {crumbs.map((item, index) => {
        const isLast = index === crumbs.length - 1
        const isLink = Boolean(item.href) && !isLast

        if (!isLink) {
          return (
            <Typography
              key={`${item.label}-${index}`}
              color={isLast ? 'text.primary' : 'text.secondary'}
              sx={{ fontWeight: isLast ? 750 : 600, fontSize: 13, letterSpacing: '-0.01em' }}
            >
              {item.label}
            </Typography>
          )
        }

        return (
          <Link key={`${item.label}-${index}`} href={item.href!} style={{ textDecoration: 'none' }}>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item.label}
            </Typography>
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
