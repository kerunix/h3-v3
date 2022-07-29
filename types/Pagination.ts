import type { ComputedRef, Ref } from 'vue'

// Remove Symbol as a valid keyof type
// See https://github.com/microsoft/TypeScript/issues/23724
type ExcludeSymbolKeys<T> = Extract<keyof T, string>

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

export type PaginationUrl<T> = `${string}?page=${PaginationState['current_page']}&limit=${PaginationState['per_page']}&orderBy=${ExcludeSymbolKeys<QueryState<T>['orderBy']>}&orderDir=${ExcludeSymbolKeys<QueryState<T>['orderBy']>}`
