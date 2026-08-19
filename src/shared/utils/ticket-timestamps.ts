export function formatTicketTimestamp(date = new Date()): string {
  return date.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function parseTicketTimestamp(value: string): number {
  const normalized = value.includes('T') ? value : value.replace(' ', 'T')
  const parsed = Date.parse(normalized)
  if (!Number.isNaN(parsed)) return parsed
  const fallback = Date.parse(value)
  return Number.isNaN(fallback) ? 0 : fallback
}
