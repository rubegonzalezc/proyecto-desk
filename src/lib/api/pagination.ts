import type { PaginatedResult } from './types'

export function paginate<T>(
  items: readonly T[],
  page?: number,
  pageSize?: number,
): PaginatedResult<T> {
  const total = items.length

  if (page === undefined || pageSize === undefined) {
    return {
      items: [...items],
      total,
      page: 1,
      pageSize: total || 1,
      pageCount: 1,
      from: total > 0 ? 1 : 0,
      to: total,
    }
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize
  const sliced = items.slice(start, start + pageSize)

  return {
    items: sliced,
    total,
    page: safePage,
    pageSize,
    pageCount,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(safePage * pageSize, total),
  }
}
