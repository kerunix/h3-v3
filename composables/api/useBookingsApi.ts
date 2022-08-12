import type { ExcludeSymbolKeys, PaginationRequest } from '~~/types'

interface BookingPostPayload extends Models.Booking {
  // TODO: Define POST request type
}

interface BookingPatchPayload extends Models.Booking {
  // TODO: Define PATCH request type
}

type FilterableBookingFields = keyof Pick<Models.Booking, 'id' | 'status'>

type FilterSuffix = '_in'

type FilterKeys<FilterableFields extends string | number | bigint | boolean> = `${FilterableFields}${FilterSuffix}`

type FilterKeyToObjectKey<FilterKey> = FilterKey extends `${infer ObjectKey}${FilterSuffix}` ? ObjectKey : never

interface QueryFilters<T extends Record<string, any>, U extends ExcludeSymbolKeys<T>> {
  limit?: number
  orderBy?: keyof T
  filters?: {
    [K in FilterKeys<U>]?: T[FilterKeyToObjectKey<K>] | T[FilterKeyToObjectKey<K>][]
  }
}

export const useBookingsApi = () => {
  const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

  const BASE_URL = '/bookings'

  function getAll() {
    return apiGet<Models.Booking[]>(BASE_URL)
  }

  function getOne(id: number | string) {
    return apiGet<Models.Booking>(BASE_URL, { params: { id } })
  }

  function deleteOne(id: number | string) {
    return apiDelete<Models.Booking>(BASE_URL, { params: { id } })
  }

  function postOne(payload: BookingPostPayload) {
    return apiPost<Models.Booking>(BASE_URL, payload)
  }

  function patchOne(id: number | string, payload: BookingPatchPayload) {
    return apiPatch<Models.Booking>(BASE_URL, payload, { params: { id } })
  }

  function getFiltered({ limit, filters, orderBy }: QueryFilters<Models.Booking, FilterableBookingFields>) {
    let queryString = '?'
    if (limit) {
      queryString += `limit=${limit}`
    }
    if (orderBy) {
      queryString += `&orderBy=${orderBy}`
    }
    if (filters) {
      for (const filter in filters) {
        queryString += `&filters[${filter}]=${Array.isArray(filters[filter]) ? filters[filter].join(',') : filters[filter]}`
      }
    }
    return apiGet<PaginationRequest<Models.Booking>>(`${BASE_URL}${queryString}`)
  }

  return {
    getAll,
    getOne,
    deleteOne,
    postOne,
    patchOne,
    getFiltered,
  }
}
