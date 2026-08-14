import type { PermissionAction, PermissionModule, Role } from '@/shared/types/role'

export const permissionActions: { key: PermissionAction; label: string }[] = [
  { key: 'ver', label: 'Ver' },
  { key: 'crear', label: 'Crear' },
  { key: 'editar', label: 'Editar' },
  { key: 'eliminar', label: 'Eliminar' },
  { key: 'exportar', label: 'Exportar' },
  { key: 'aprobar', label: 'Aprobar' },
]

export const permissionGroups: {
  id: string
  label: string
  description: string
  modules: { key: PermissionModule; label: string; hint?: string }[]
}[] = [
  {
    id: 'helpdesk',
    label: 'Mesa de ayuda',
    description: 'Tickets, directorio y catálogos IT',
    modules: [
      { key: 'helpdesk', label: 'Acceso al sistema', hint: 'Puede abrir este sistema' },
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'tickets', label: 'Tickets' },
      { key: 'usuarios', label: 'Usuarios' },
      { key: 'roles', label: 'Roles y permisos' },
      { key: 'equipos', label: 'Equipos' },
      { key: 'activos', label: 'Activos TI' },
      { key: 'conocimiento', label: 'Base de conocimiento' },
      { key: 'configuracion', label: 'Configuración' },
    ],
  },
  {
    id: 'inventario',
    label: 'Sistema de inventario',
    description: 'Artículos, almacenes, stock y proveedores',
    modules: [
      { key: 'inventario', label: 'Acceso al sistema', hint: 'Puede abrir este sistema' },
      { key: 'inv_dashboard', label: 'Dashboard' },
      { key: 'inv_articulos', label: 'Artículos' },
      { key: 'inv_almacenes', label: 'Almacenes' },
      { key: 'inv_movimientos', label: 'Movimientos' },
      { key: 'inv_proveedores', label: 'Proveedores' },
    ],
  },
  {
    id: 'platform',
    label: 'Plataforma SynchroDev',
    description: 'Gobierno multi-tenant y clientes contratados',
    modules: [{ key: 'clientes', label: 'Clientes', hint: 'Ver y administrar tenants' }],
  },
]

export const permissionModules = permissionGroups.flatMap((group) => group.modules)

const all: PermissionAction[] = ['ver', 'crear', 'editar', 'eliminar', 'exportar', 'aprobar']
const none: PermissionAction[] = []
const read: PermissionAction[] = ['ver']
const agent: PermissionAction[] = ['ver', 'crear', 'editar']
const lead: PermissionAction[] = ['ver', 'crear', 'editar', 'exportar', 'aprobar']

const emptyPermissions = Object.fromEntries(
  permissionModules.map((moduleItem) => [moduleItem.key, none]),
) as Role['permissions']

function perms(overrides: Partial<Role['permissions']>): Role['permissions'] {
  return { ...emptyPermissions, ...overrides }
}

export function countGranted(permissions: Role['permissions']) {
  return Object.values(permissions).flat().length
}

export function systemsWithAccess(permissions: Role['permissions']) {
  return permissionGroups
    .filter((group) => group.id === 'helpdesk' || group.id === 'inventario')
    .filter((group) => (permissions[group.modules[0].key] ?? []).includes('ver'))
    .map((group) => group.label)
}

export const roles: Role[] = [
  {
    id: 'ROL-01',
    name: 'Administrador',
    description: 'Administrador de plataforma SynchroDev. Acceso total a tenants y sistemas.',
    usersCount: 2,
    color: '#2563EB',
    permissions: perms({
      helpdesk: all,
      dashboard: all,
      tickets: all,
      usuarios: all,
      roles: all,
      equipos: all,
      activos: all,
      conocimiento: all,
      configuracion: all,
      inventario: all,
      inv_dashboard: all,
      inv_articulos: all,
      inv_almacenes: all,
      inv_movimientos: all,
      inv_proveedores: all,
      clientes: all,
    }),
  },
  {
    id: 'ROL-02',
    name: 'Supervisor de mesa',
    description: 'Coordina colas de tickets y consulta inventario en lectura.',
    usersCount: 3,
    color: '#0F172A',
    permissions: perms({
      helpdesk: all,
      dashboard: ['ver', 'exportar'],
      tickets: lead,
      usuarios: ['ver'],
      roles: ['ver'],
      equipos: ['ver', 'editar'],
      activos: ['ver', 'exportar'],
      conocimiento: agent,
      configuracion: read,
      clientes: read,
      inventario: read,
      inv_dashboard: read,
      inv_articulos: read,
      inv_almacenes: read,
      inv_movimientos: ['ver', 'exportar'],
      inv_proveedores: read,
    }),
  },
  {
    id: 'ROL-03',
    name: 'Técnico',
    description: 'Atiende tickets y registra movimientos de stock en terreno.',
    usersCount: 8,
    color: '#10B981',
    permissions: perms({
      helpdesk: ['ver'],
      dashboard: read,
      tickets: agent,
      usuarios: read,
      equipos: read,
      activos: ['ver', 'editar'],
      conocimiento: ['ver', 'crear'],
      inventario: ['ver'],
      inv_dashboard: read,
      inv_articulos: ['ver', 'editar'],
      inv_almacenes: read,
      inv_movimientos: agent,
    }),
  },
  {
    id: 'ROL-04',
    name: 'Agente de mesa',
    description: 'Registra solicitudes de mesa. Sin acceso a inventario.',
    usersCount: 6,
    color: '#F59E0B',
    permissions: perms({
      helpdesk: ['ver'],
      dashboard: read,
      tickets: ['ver', 'crear', 'editar'],
      usuarios: read,
      equipos: read,
      activos: read,
      conocimiento: ['ver'],
    }),
  },
  {
    id: 'ROL-05',
    name: 'Solicitante',
    description: 'Crea tickets y consulta el estado de sus solicitudes.',
    usersCount: 48,
    color: '#667085',
    permissions: perms({
      helpdesk: ['ver'],
      tickets: ['ver', 'crear'],
      conocimiento: ['ver'],
    }),
  },
  {
    id: 'ROL-06',
    name: 'Operador de inventario',
    description: 'Gestiona artículos, almacenes y movimientos. Sin mesa de ayuda.',
    usersCount: 4,
    color: '#60A5FA',
    permissions: perms({
      inventario: all,
      inv_dashboard: ['ver', 'exportar'],
      inv_articulos: all,
      inv_almacenes: agent,
      inv_movimientos: all,
      inv_proveedores: ['ver', 'editar'],
    }),
  },
]
