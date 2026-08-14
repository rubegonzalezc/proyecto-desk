export interface AppNotification {
  id: string
  title: string
  detail: string
  time: string
  unread: boolean
}

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'SLA en riesgo · TCK-1011',
    detail: 'Switch de bodega con temperatura alta. Quedan 8 minutos.',
    time: 'Hace 2 min',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Nuevo ticket crítico',
    detail: 'VPN corporativa cae cada 20 minutos.',
    time: 'Hace 18 min',
    unread: true,
  },
  {
    id: 'n3',
    title: 'TCK-1005 resuelto',
    detail: 'Carlos Soto cerró el incidente de Outlook.',
    time: 'Hace 1 h',
    unread: false,
  },
  {
    id: 'n4',
    title: 'Licencia Adobe',
    detail: 'Creative Cloud expira en 5 días.',
    time: 'Hace 3 h',
    unread: false,
  },
]
