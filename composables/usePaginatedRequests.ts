import type { PaginationRequest, PaginationState, QueryState } from '~~/types'

export default async function usePaginatedRequests<T extends Record<string, any>>(baseUrl: string) {
  const { apiGet } = useApi()

  const paginationState = reactive<PaginationState>({
    current_page: 1,
    per_page: 10,
    prev_page: null,
    next_page: 2,
    total: null,
  })

  const queryState = reactive<QueryState<T>>({
    orderBy: 'id',
    orderDir: 'desc',
    search: '',
    filters: null,
    excludeFromSearch: null,
  })

  const urlWithQuery = computed(() => {
    let url = `${baseUrl}?page=${paginationState.current_page}&limit=${paginationState.per_page}&orderBy=${String(queryState.orderBy)}&orderDir=${queryState.orderDir}`
    // FIXME: Fix this search because the backend is throwing an error
    // if (queryState.search) {
    //   url += `$search=${queryState.search}`
    // }
    if (queryState.filters) {
      url += `&${Object.keys(queryState.filters)
        .map((field) => {
          let value = queryState.filters[field]
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
    if (queryState.excludeFromSearch) {
      url += queryState.excludeFromSearch.map(field => `&excludeFromSearch[${field}]`)
    }
    return url
  })

  const { data, error, refresh, pending } = await useAsyncData<PaginationRequest<T>>(
    baseUrl,
    () => apiGet(urlWithQuery.value),
  )

  watchEffect(
    () => {
      paginationState.current_page = data.value.current_page
      paginationState.next_page = data.value.next_page
      paginationState.prev_page = data.value.prev_page
      paginationState.per_page = data.value.per_page
      paginationState.total = data.value.total
    },
  )

  watch(
    () => urlWithQuery.value,
    async () => refresh(),
  )

  return {
    data,
    error,
    refresh,
    pending,
    urlWithQuery,
    paginationState,
    queryState,
  }
}
