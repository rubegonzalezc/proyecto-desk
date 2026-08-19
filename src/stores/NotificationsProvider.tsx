'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadReadNotificationIds, saveReadNotificationIds } from '@/shared/config/notifications-storage'
import {
  notifications as notificationSeed,
  type AppNotification,
} from '@/shared/mock/notifications'

type NotificationsContextValue = {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

function applyReadState(seed: AppNotification[], readIds: Set<string>): AppNotification[] {
  return seed.map((item) => ({
    ...item,
    unread: readIds.has(item.id) ? false : item.unread,
  }))
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setReadIds(loadReadNotificationIds())
    setHydrated(true)
  }, [])

  const notifications = useMemo(
    () => applyReadState(notificationSeed, hydrated ? readIds : new Set()),
    [hydrated, readIds],
  )

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  )

  const markAsRead = useCallback((id: string) => {
    setReadIds((current) => {
      if (current.has(id)) return current
      const next = new Set(current)
      next.add(id)
      saveReadNotificationIds(next)
      return next
    })
  }, [])

  const markAllAsRead = useCallback(() => {
    const next = new Set(notificationSeed.map((item) => item.id))
    setReadIds(next)
    saveReadNotificationIds(next)
  }, [])

  const value = useMemo(
    () => ({ notifications, unreadCount, markAsRead, markAllAsRead }),
    [markAllAsRead, markAsRead, notifications, unreadCount],
  )

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return context
}
