import type { AuthCookie, ExtendedFetchOptions } from '~~/types'

export default function useApi() {
  const { public: { apiBaseUrl: baseURL } } = useRuntimeConfig()

  const defaultOptions: ExtendedFetchOptions<any> = {
    baseURL,
  }

  const authCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })

  const authHeader = computed(() => authCookie.value?.token ? `Bearer ${authCookie.value.token}` : null)

  function getFinalOptions(options: ExtendedFetchOptions<any>) {
    if (options.authenticated === false || !authHeader.value) {
      return { ...options, ...defaultOptions }
    }
    return { headers: { Authorization: authHeader.value, ...options.headers }, ...options, ...defaultOptions }
  }

  function apiRequest<T>(url: string, options?: ExtendedFetchOptions<T>) {
    return $fetch<T>(url, getFinalOptions(options))
  }

  function apiGet<T>(url: string, options?: ExtendedFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'get', ...options })
  }

  function apiPost<T>(url: string, data: any, options?: ExtendedFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'post', body: data, ...options })
  }

  function apiPatch<T>(url: string, data: any, options?: ExtendedFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'post', body: data, ...options })
  }

  function apiDelete<T>(url: string, options?: ExtendedFetchOptions<T>) {
    return apiRequest(url, { baseURL, method: 'delete', ...options })
  }

  function apiPut<T>(url: string, options?: ExtendedFetchOptions<T>) {
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
