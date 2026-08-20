import {
  notifications as seedNotifications,
  getNotificationHref as getMockNotificationHref,
  type AppNotification,
} from '@/shared/mock/notifications'
import { paginate } from './pagination'
import type { PaginatedResult, PaginationParams } from './types'

export type { AppNotification }

export type ListNotificationsParams = PaginationParams & {
  tenantId?: string
  unreadOnly?: boolean
}

function filterNotifications(
  source: readonly AppNotification[],
  params: ListNotificationsParams,
): AppNotification[] {
  // TODO: supabase.from('notifications').select('*').eq('tenant_id', params.tenantId)
  void params.tenantId

  if (!params.unreadOnly) return [...source]
  return source.filter((item) => item.unread)
}

export async function listNotifications(
  params: ListNotificationsParams = {},
  source?: readonly AppNotification[],
): Promise<PaginatedResult<AppNotification>> {
  // TODO: supabase.from('notifications').select('*', { count: 'exact' }).eq('tenant_id', params.tenantId)
  const base = source ? [...source] : [...seedNotifications]
  const filtered = filterNotifications(base, params)
  return paginate(filtered, params.page, params.pageSize)
}

export function getNotificationsSeedSync(): AppNotification[] {
  return [...seedNotifications]
}

export async function getNotificationsSeed(): Promise<AppNotification[]> {
  // TODO: supabase.from('notifications').select('*')
  return getNotificationsSeedSync()
}

export function getNotificationHref(notification: AppNotification): string {
  // TODO: resolver href desde supabase o tabla de rutas
  return getMockNotificationHref(notification)
}
