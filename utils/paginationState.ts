import type { PaginationQuery, QueryState } from '~~/types'

export function getInitialPaginationStateFromRouteQuery<T>(routeQuery: PaginationQuery<T>) {
  return {
    current_page: isString(routeQuery.current_page) ? parseInt(routeQuery.current_page) : 1,
    per_page: isString(routeQuery.per_page) ? parseInt(routeQuery.per_page) : 10,
    prev_page: null,
    next_page: null,
    total: null,
  }
}

export function getInitialQueryStateFromRouteQuery<T>(routeQuery: PaginationQuery<T>) {
  return {
    orderBy: isString(routeQuery.orderBy) ? routeQuery.orderBy : 'id',
    orderDir: isString(routeQuery.orderDir) ? routeQuery.orderDir : 'desc',
    search: '',
    filters: null,
    excludeFromSearch: null,
  }
}

export function addFilters<T>(filters: QueryState<T>['filters']) {
  return `&${Object.keys(filters)
    .map((field) => {
      let value = filters[field]
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      // Don't create empty filters.
      if (value.length) {
        return `filters[${field}]=${value}`
      }
      return null
    })
    .filter((filter: string | null) => filter !== null)
    .join('&')}`
}
