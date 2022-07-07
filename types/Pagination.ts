import type { ComputedRef, Ref } from 'vue'

export interface PaginationState {
  current_page: number
  per_page: number
  prev_page: number | null
  next_page: number | null
  total: number | null
}

export interface QueryState {
  orderDir: 'desc' | 'asc'
  orderBy: string
  search: string
  filters: Record<string, string | string[]> | null
  excludeFromSearch: string[]
}

export interface PaginationRequest<T> {
  current_page: number
  per_page: number
  prev_page: number | null
  next_page: number | null
  total: number
  data: T[]
}

export interface TableState {
  activeItem: Ref<string>
  registerHeaderItem: (id: string) => void
  setActiveItem: (id: string) => Promise<void>
  colNumber: ComputedRef<number>
  error: Ref<true | Error>
  isEmpty: ComputedRef<boolean>
  queryState: QueryState
}
