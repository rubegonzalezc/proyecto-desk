export type SystemId = 'helpdesk' | 'inventario'

export type NavIconName =
  | 'dashboard'
  | 'tickets'
  | 'users'
  | 'roles'
  | 'teams'
  | 'assets'
  | 'knowledge'
  | 'settings'
  | 'items'
  | 'warehouses'
  | 'moves'
  | 'suppliers'
  | 'tenants'

export type NavBadgeKey = 'ticketsOpen'

export interface SystemNavItem {
  href: string
  label: string
  icon: NavIconName
  /** Badge estático (p. ej. inventario sin tenantId aún). */
  badge?: string
  /** Badge derivado del tenant activo en el sidebar. */
  badgeKey?: NavBadgeKey
}

export interface SystemNavGroup {
  id: string
  label: string
  items: SystemNavItem[]
}

export interface AppSystem {
  id: SystemId
  name: string
  shortName: string
  description: string
  home: string
  searchPlaceholder: string
  groups: SystemNavGroup[]
}

export const appSystems: AppSystem[] = [
  {
    id: 'helpdesk',
    name: 'Mesa de ayuda',
    shortName: 'Mesa de ayuda',
    description: 'Tickets, equipos y mesa de soporte IT',
    home: '/dashboard',
    searchPlaceholder: 'Buscar tickets, usuarios o activos',
    groups: [
      {
        id: 'ops',
        label: 'Operación',
        items: [
          { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { href: '/tickets', label: 'Tickets', icon: 'tickets', badgeKey: 'ticketsOpen' },
        ],
      },
      {
        id: 'org',
        label: 'Organización',
        items: [
          { href: '/usuarios', label: 'Usuarios', icon: 'users' },
          { href: '/roles', label: 'Roles y permisos', icon: 'roles' },
          { href: '/equipos', label: 'Equipos', icon: 'teams' },
        ],
      },
      {
        id: 'catalog',
        label: 'Catálogo',
        items: [
          { href: '/activos', label: 'Activos TI', icon: 'assets' },
          { href: '/conocimiento', label: 'Conocimiento', icon: 'knowledge' },
        ],
      },
      {
        id: 'sys',
        label: 'Ajustes',
        items: [{ href: '/configuracion', label: 'Configuración', icon: 'settings' }],
      },
    ],
  },
  {
    id: 'inventario',
    name: 'Sistema de inventario',
    shortName: 'Inventario',
    description: 'Artículos, almacenes, stock y movimientos',
    home: '/inventario',
    searchPlaceholder: 'Buscar SKU, almacén o proveedor',
    groups: [
      {
        id: 'ops',
        label: 'Operación',
        items: [
          { href: '/inventario', label: 'Dashboard', icon: 'dashboard' },
          { href: '/inventario/movimientos', label: 'Movimientos', icon: 'moves', badge: '6' },
        ],
      },
      {
        id: 'catalog',
        label: 'Catálogo',
        items: [
          { href: '/inventario/articulos', label: 'Artículos', icon: 'items' },
          { href: '/inventario/almacenes', label: 'Almacenes', icon: 'warehouses' },
          { href: '/inventario/proveedores', label: 'Proveedores', icon: 'suppliers' },
        ],
      },
    ],
  },
]

export function getSystemById(id: SystemId) {
  return appSystems.find((system) => system.id === id) ?? appSystems[0]
}

export function getSystemByPath(pathname: string) {
  if (pathname === '/inventario' || pathname.startsWith('/inventario/')) {
    return getSystemById('inventario')
  }
  return getSystemById('helpdesk')
}

export function isNavItemActive(pathname: string, href: string, home: string) {
  if (href === home) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function resolveNavBadge(
  item: SystemNavItem,
  tenant: { ticketsOpen: number },
): string | undefined {
  if (item.badgeKey === 'ticketsOpen') return String(tenant.ticketsOpen)
  return item.badge
}
