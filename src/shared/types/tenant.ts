export type TenantStatus = 'Activo' | 'Onboarding' | 'Suspendido'

export interface Tenant {
  id: string
  name: string
  slug: string
  domain: string
  plan: string
  status: TenantStatus
  contractedAt: string
  users: number
  ticketsOpen: number
  systems: string[]
  logo: string
  adminName: string
  adminEmail: string
  region: string
}
