import type { Ticket } from '@/shared/types/ticket'

const STORAGE_KEY = 'synchrodesk:tickets'

export function loadTicketsSession(): Ticket[] | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Ticket[]
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveTicketsSession(tickets: Ticket[]) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}
