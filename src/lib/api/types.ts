export type PaginationParams = {
  page?: number
  pageSize?: number
}

export type PaginatedResult<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
  from: number
  to: number
}
