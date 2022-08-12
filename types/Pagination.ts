import type { ComputedRef, Ref } from 'vue'
import type { ExcludeSymbolKeys } from './Utils'

export interface PaginationState {
  current_page: number
  per_page: number
  prev_page: number | null
  next_page: number | null
  total: number | null
}

export interface QueryState<T> {
  orderDir: 'desc' | 'asc'
  orderBy: keyof T
  search: string
  filters: Record<`${ExcludeSymbolKeys<T>}_in`, string | string[]> | null
  excludeFromSearch: ExcludeSymbolKeys<T>[] | null
}

export interface PaginationRequest<T> {
  current_page: number
  per_page: number
  prev_page: number | null
  next_page: number | null
  total: number
  data: T[]
}

export interface TableState<T> {
  activeItem: Ref<keyof T>
  registerHeaderItem: (id: string) => void
  setActiveItem: (id: string) => Promise<void>
  colNumber: ComputedRef<number>
  error: Ref<true | Error>
  isEmpty: ComputedRef<boolean>
  queryState: QueryState<T>
}

export type PaginationQuery<T> = PaginationState & QueryState<T>
