export type DashboardKpiTone = 'info' | 'warning' | 'success' | 'error' | 'neutral'

/** KPI de mesa de ayuda. El tenant se define en el snapshot `TenantDashboard`. */
export interface DashboardKpi {
  id: string
  label: string
  value: string
  delta: string
  tone: DashboardKpiTone
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

/** Vista agregada del dashboard por tenant (preparada para RLS por `tenant_id`). */
export interface TenantDashboard {
  tenantId: string
  kpis: DashboardKpi[]
  ticketsByDay: TicketDayPoint[]
  activeTechnicians: ActiveTechnician[]
}
