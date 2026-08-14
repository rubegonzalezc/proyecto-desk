import type { Ticket } from '@/shared/types/ticket'
import { tickets } from './tickets'

export interface DashboardKpi {
  id: string
  label: string
  value: string
  delta: string
  tone: 'info' | 'warning' | 'success' | 'error' | 'neutral'
}

export interface TicketDayPoint {
  day: string
  abiertos: number
  resueltos: number
}

export interface ActiveTechnician {
  name: string
  initials: string
  resolved: number
  online: boolean
  team: string
}

export const dashboardKpis: DashboardKpi[] = [
  { id: 'open', label: 'Tickets abiertos', value: '28', delta: '+4 hoy', tone: 'info' },
  { id: 'pending', label: 'Tickets pendientes', value: '9', delta: '3 en espera de usuario', tone: 'warning' },
  { id: 'resolved', label: 'Resueltos hoy', value: '12', delta: '+18% vs ayer', tone: 'success' },
  { id: 'sla', label: 'SLA en riesgo', value: '3', delta: '2 críticos', tone: 'error' },
  { id: 'techs', label: 'Técnicos conectados', value: '7', delta: 'de 11 en turno', tone: 'neutral' },
  { id: 'frt', label: 'Tiempo promedio de respuesta', value: '11 min', delta: '-2 min esta semana', tone: 'success' },
]

export const ticketsByDay: TicketDayPoint[] = [
  { day: 'Sáb', abiertos: 6, resueltos: 8 },
  { day: 'Dom', abiertos: 4, resueltos: 3 },
  { day: 'Lun', abiertos: 18, resueltos: 14 },
  { day: 'Mar', abiertos: 15, resueltos: 16 },
  { day: 'Mié', abiertos: 21, resueltos: 17 },
  { day: 'Jue', abiertos: 19, resueltos: 18 },
  { day: 'Vie', abiertos: 14, resueltos: 12 },
]

export const activeTechnicians: ActiveTechnician[] = [
  { name: 'Carlos Soto', initials: 'CS', resolved: 9, online: true, team: 'Redes' },
  { name: 'Sofía Vega', initials: 'SV', resolved: 8, online: true, team: 'Mesa de ayuda' },
  { name: 'Elena Ruiz', initials: 'ER', resolved: 6, online: true, team: 'Infraestructura' },
  { name: 'Andrés Silva', initials: 'AS', resolved: 5, online: true, team: 'Soporte terreno' },
]

export const recentTickets: Ticket[] = tickets.slice(0, 6)
