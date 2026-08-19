export type UserStatus = 'Activo' | 'Inactivo' | 'Invitado'

export interface User {
  id: string
  /** FK a `tenants.id` — base para RLS en Supabase */
  tenantId: string
  name: string
  email: string
  role: string
  status: UserStatus
  lastAccess: string
  team: string
  initials: string
}
