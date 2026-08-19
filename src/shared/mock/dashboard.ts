import type { TenantDashboard } from '@/shared/types/dashboard'
import type { Ticket } from '@/shared/types/ticket'
import { defaultTenantId, demoTenantIds } from './tenants'
import { tickets } from './tickets'

const { google: TEN_GOOGLE, andes: TEN_ANDES, nexus: TEN_NEXUS } = demoTenantIds

/** Snapshots de dashboard por tenant — valores alineados con `tenants.ticketsOpen`. */
export const tenantDashboards: TenantDashboard[] = [
  {
    tenantId: TEN_GOOGLE,
    kpis: [
      { id: 'open', label: 'Tickets abiertos', value: '28', delta: '+4 hoy', tone: 'info' },
      { id: 'pending', label: 'Tickets pendientes', value: '9', delta: '3 en espera de usuario', tone: 'warning' },
      { id: 'resolved', label: 'Resueltos hoy', value: '12', delta: '+18% vs ayer', tone: 'success' },
      { id: 'sla', label: 'SLA en riesgo', value: '3', delta: '2 críticos', tone: 'error' },
      { id: 'techs', label: 'Técnicos conectados', value: '7', delta: 'de 11 en turno', tone: 'neutral' },
      { id: 'frt', label: 'Tiempo promedio de respuesta', value: '11 min', delta: '-2 min esta semana', tone: 'success' },
    ],
    ticketsByDay: [
      { day: 'Sáb', abiertos: 6, resueltos: 8 },
      { day: 'Dom', abiertos: 4, resueltos: 3 },
      { day: 'Lun', abiertos: 18, resueltos: 14 },
      { day: 'Mar', abiertos: 15, resueltos: 16 },
      { day: 'Mié', abiertos: 21, resueltos: 17 },
      { day: 'Jue', abiertos: 19, resueltos: 18 },
      { day: 'Vie', abiertos: 14, resueltos: 12 },
    ],
    activeTechnicians: [
      { name: 'Carlos Soto', initials: 'CS', resolved: 9, online: true, team: 'Redes' },
      { name: 'Sofía Vega', initials: 'SV', resolved: 8, online: true, team: 'Mesa de ayuda' },
      { name: 'Elena Ruiz', initials: 'ER', resolved: 6, online: true, team: 'Infraestructura' },
      { name: 'Andrés Silva', initials: 'AS', resolved: 5, online: true, team: 'Soporte terreno' },
    ],
  },
  {
    tenantId: TEN_ANDES,
    kpis: [
      { id: 'open', label: 'Tickets abiertos', value: '15', delta: '+1 hoy', tone: 'info' },
      { id: 'pending', label: 'Tickets pendientes', value: '5', delta: '2 en bodega central', tone: 'warning' },
      { id: 'resolved', label: 'Resueltos hoy', value: '8', delta: '+6% vs ayer', tone: 'success' },
      { id: 'sla', label: 'SLA en riesgo', value: '1', delta: 'escáner de muelle', tone: 'error' },
      { id: 'techs', label: 'Técnicos conectados', value: '4', delta: 'de 6 en turno', tone: 'neutral' },
      { id: 'frt', label: 'Tiempo promedio de respuesta', value: '14 min', delta: 'estable', tone: 'neutral' },
    ],
    ticketsByDay: [
      { day: 'Sáb', abiertos: 2, resueltos: 3 },
      { day: 'Dom', abiertos: 1, resueltos: 2 },
      { day: 'Lun', abiertos: 9, resueltos: 7 },
      { day: 'Mar', abiertos: 8, resueltos: 9 },
      { day: 'Mié', abiertos: 11, resueltos: 10 },
      { day: 'Jue', abiertos: 10, resueltos: 8 },
      { day: 'Vie', abiertos: 7, resueltos: 6 },
    ],
    activeTechnicians: [
      { name: 'Camila Ríos', initials: 'CR', resolved: 5, online: true, team: 'Tecnología' },
      { name: 'María Pérez', initials: 'MP', resolved: 4, online: true, team: 'Operaciones' },
      { name: 'Luis Ortega', initials: 'LO', resolved: 3, online: false, team: 'Distribución' },
      { name: 'Patricia Díaz', initials: 'PD', resolved: 2, online: true, team: 'Planificación' },
    ],
  },
  {
    tenantId: TEN_NEXUS,
    kpis: [
      { id: 'open', label: 'Tickets abiertos', value: '4', delta: 'onboarding activo', tone: 'info' },
      { id: 'pending', label: 'Tickets pendientes', value: '2', delta: '1 espera proveedor', tone: 'warning' },
      { id: 'resolved', label: 'Resueltos hoy', value: '3', delta: 'primer mes de operación', tone: 'success' },
      { id: 'sla', label: 'SLA en riesgo', value: '0', delta: 'sin alertas', tone: 'success' },
      { id: 'techs', label: 'Técnicos conectados', value: '2', delta: 'de 3 contratados', tone: 'neutral' },
      { id: 'frt', label: 'Tiempo promedio de respuesta', value: '18 min', delta: '+3 min vs meta', tone: 'warning' },
    ],
    ticketsByDay: [
      { day: 'Sáb', abiertos: 0, resueltos: 1 },
      { day: 'Dom', abiertos: 1, resueltos: 0 },
      { day: 'Lun', abiertos: 3, resueltos: 2 },
      { day: 'Mar', abiertos: 2, resueltos: 3 },
      { day: 'Mié', abiertos: 4, resueltos: 2 },
      { day: 'Jue', abiertos: 3, resueltos: 4 },
      { day: 'Vie', abiertos: 2, resueltos: 3 },
    ],
    activeTechnicians: [
      { name: 'Héctor Lagos', initials: 'HL', resolved: 3, online: true, team: 'TI clínica' },
      { name: 'Ignacio Paredes', initials: 'IP', resolved: 2, online: true, team: 'Equipos médicos' },
      { name: 'Valentina Cruz', initials: 'VC', resolved: 1, online: false, team: 'Mesa de ayuda' },
    ],
  },
]

export function getDashboardForTenant(tenantId: string): TenantDashboard {
  return tenantDashboards.find((dashboard) => dashboard.tenantId === tenantId) ?? tenantDashboards[0]
}

export function getRecentTicketsForTenant(tenantId: string, limit = 6): Ticket[] {
  return tickets.filter((ticket) => ticket.tenantId === tenantId).slice(0, limit)
}

/** @deprecated Usar `getDashboardForTenant(tenantId).kpis` — mantiene compatibilidad con el tenant por defecto. */
export const dashboardKpis = getDashboardForTenant(defaultTenantId).kpis

/** @deprecated Usar `getDashboardForTenant(tenantId).ticketsByDay` */
export const ticketsByDay = getDashboardForTenant(defaultTenantId).ticketsByDay

/** @deprecated Usar `getDashboardForTenant(tenantId).activeTechnicians` */
export const activeTechnicians = getDashboardForTenant(defaultTenantId).activeTechnicians

/** @deprecated Usar `getRecentTicketsForTenant(tenantId)` */
export const recentTickets: Ticket[] = getRecentTicketsForTenant(defaultTenantId)

export type { DashboardKpi, TicketDayPoint, ActiveTechnician, TenantDashboard } from '@/shared/types/dashboard'
