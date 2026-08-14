export type AssetType = 'Equipo' | 'Impresora' | 'Router' | 'Switch' | 'Licencia'
export type AssetStatus = 'Operativo' | 'En mantenimiento' | 'Retirado' | 'Asignado'

export interface Asset {
  id: string
  name: string
  type: AssetType
  serial: string
  assignee: string
  status: AssetStatus
  location: string
}
