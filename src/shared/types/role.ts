export type PermissionAction = 'ver' | 'crear' | 'editar' | 'eliminar' | 'exportar' | 'aprobar'

export type PermissionModule =
  | 'helpdesk'
  | 'dashboard'
  | 'tickets'
  | 'usuarios'
  | 'roles'
  | 'equipos'
  | 'activos'
  | 'conocimiento'
  | 'configuracion'
  | 'inventario'
  | 'inv_dashboard'
  | 'inv_articulos'
  | 'inv_almacenes'
  | 'inv_movimientos'
  | 'inv_proveedores'
  | 'clientes'

export interface Role {
  id: string
  name: string
  description: string
  usersCount: number
  color: string
  permissions: Record<PermissionModule, PermissionAction[]>
}
