import { users } from '@/shared/mock/users'

export const USER_ROLES = [...new Set(users.map((user) => user.role))].sort((left, right) =>
  left.localeCompare(right, 'es'),
)

export const USER_TEAMS = [...new Set(users.map((user) => user.team))].sort((left, right) =>
  left.localeCompare(right, 'es'),
)

export function isValidInviteEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
