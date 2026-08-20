import { users as seedUsers, getUserById as getMockUserById } from '@/shared/mock/users'
import { filterByTenant } from '@/shared/mock/tenant-scope'
import type { User } from '@/shared/types/user'
import { paginate } from './pagination'
import type { PaginatedResult, PaginationParams } from './types'

export type ListUsersParams = PaginationParams & {
  tenantId: string
  q?: string
}

function filterUsers(source: readonly User[], params: ListUsersParams): User[] {
  let result = filterByTenant(source, params.tenantId)
  const normalized = params.q?.trim().toLowerCase()

  if (normalized) {
    result = result.filter((user) => {
      const haystack = `${user.name} ${user.email} ${user.role}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }

  return result
}

export async function listUsers(
  params: ListUsersParams,
  source?: readonly User[],
): Promise<PaginatedResult<User>> {
  // TODO: supabase.from('users').select('*', { count: 'exact' }).eq('tenant_id', params.tenantId)
  const base = source ? [...source] : [...seedUsers]
  const filtered = filterUsers(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export function getUserByIdSync(id: string, tenantId?: string): User | null {
  const user = getMockUserById(id)
  if (!user) return null
  if (tenantId && user.tenantId !== tenantId) return null
  return user
}

export async function getUserById(id: string, tenantId?: string): Promise<User | null> {
  // TODO: supabase.from('users').select('*').eq('id', id).eq('tenant_id', tenantId).single()
  const user = getMockUserById(id)
  if (!user) return null
  if (tenantId && user.tenantId !== tenantId) return null
  return user
}

export function getUsersSeedSync(): User[] {
  return [...seedUsers]
}

export async function getUsersSeed(): Promise<User[]> {
  // TODO: supabase.from('users').select('*')
  return getUsersSeedSync()
}
