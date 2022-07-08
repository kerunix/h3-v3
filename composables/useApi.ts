import type { UseFetchOptions } from '#app'
import type { AuthCookie } from '~~/types'

export default function useApi() {
  const { public: { apiBaseUrl: baseURL } } = useRuntimeConfig()

  const authCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })

  const authHeader = computed(() => `Bearer ${authCookie.value.token}`)

  function apiRequest<T>(url: string, options?: UseFetchOptions<T>) {
    return $fetch<T>(url, { baseURL, headers: { Authorization: authHeader.value, ...options.headers }, ...options })
  }

  function apiGet<T>(url: string, options?: UseFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'get', ...options })
  }

  function apiPost<T>(url: string, options?: UseFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'post', ...options })
  }

  function apiPatch<T>(url: string, options?: UseFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'patch', ...options })
  }

  function apiDelete<T>(url: string, options?: UseFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'delete', ...options })
  }

  function apiPut<T>(url: string, options?: UseFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'put', ...options })
  }

  return {
    apiGet,
    apiPost,
    apiPatch,
    apiDelete,
    apiPut,
  }
}
