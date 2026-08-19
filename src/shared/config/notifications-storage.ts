const STORAGE_KEY = 'synchrodesk:notification-read-ids'

export function loadReadNotificationIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

export function saveReadNotificationIds(ids: Set<string>) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}
