import type { LocationQueryRaw, RouteLocationNormalized } from 'vue-router'
import type { PaginationQuery, PaginationRequest, PaginationState, QueryState } from '~~/types'

export default async function usePaginatedRequests<T extends Record<string, any>>(baseUrl: string) {
  const { query: routeQuery, path } = useRoute() as unknown as { query: PaginationQuery<T> } & RouteLocationNormalized
  const router = useRouter()
  const { apiGet } = useApi()

  const paginationState = reactive<PaginationState>({
    ...getInitialPaginationStateFromRouteQuery<T>(routeQuery),
  })

  const queryState = reactive<QueryState<T>>({
    ...getInitialQueryStateFromRouteQuery<T>(routeQuery),
  })

  const urlWithQuery = computed(() => {
    let url = `${baseUrl}?page=${paginationState.current_page}&limit=${paginationState.per_page}&orderBy=${String(queryState.orderBy)}&orderDir=${queryState.orderDir}`
    // FIXME: Fix this search because the backend is throwing an error
    // if (queryState.search) {
    //   query += `$search=${queryState.search}`
    // }
    if (queryState.filters) {
      url += getFilterStringFromState(queryState.filters)
    }
    if (queryState.excludeFromSearch) {
      url += queryState.excludeFromSearch.map(field => `&excludeFromSearch[${field}]`)
    }
    return `${url}`
  })

  const { data, error, refresh, pending } = await useAsyncData<PaginationRequest<T>>(
    baseUrl,
    () => apiGet(urlWithQuery.value),
  )

  watchEffect(
    async () => {
      paginationState.current_page = data.value.current_page
      paginationState.next_page = data.value.next_page
      paginationState.prev_page = data.value.prev_page
      paginationState.per_page = data.value.per_page
      paginationState.total = data.value.total
    },
  )

  watch(
    () => urlWithQuery.value,
    async () => {
      await refresh()
      await router.replace({
        path,
        query: {
          ...paginationState,
          ...queryState,
        } as LocationQueryRaw,
      })
    },
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
