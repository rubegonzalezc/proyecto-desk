export interface AppNotification {
  id: string
  title: string
  detail: string
  time: string
  unread: boolean
  /** Navega a `/tickets/[id]` cuando está presente. */
  ticketId?: string
  /** Ruta de destino cuando no hay ticket asociado. */
  href?: string
}

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'SLA en riesgo · TCK-1011',
    detail: 'Switch de bodega con temperatura alta. Quedan 8 minutos.',
    time: 'Hace 2 min',
    unread: true,
    ticketId: 'TCK-1011',
  },
  {
    id: 'n2',
    title: 'Nuevo ticket crítico',
    detail: 'VPN corporativa cae cada 20 minutos.',
    time: 'Hace 18 min',
    unread: true,
    ticketId: 'TCK-1003',
  },
  {
    id: 'n3',
    title: 'TCK-1005 resuelto',
    detail: 'Carlos Soto cerró el incidente de Outlook.',
    time: 'Hace 1 h',
    unread: false,
    ticketId: 'TCK-1005',
  },
  {
    id: 'n4',
    title: 'Licencias por vencer',
    detail: 'Creative Cloud y Zoom requieren renovación esta semana.',
    time: 'Hace 3 h',
    unread: false,
    href: '/tickets',
  },
]

export function getNotificationHref(notification: AppNotification): string {
  if (notification.ticketId) return `/tickets/${notification.ticketId}`
  return notification.href ?? '/dashboard'
}
