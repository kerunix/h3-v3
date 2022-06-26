import type { UseFetchOptions } from '#app'

export default function useApi() {
  const { public: { apiBaseUrl: baseURL } } = useRuntimeConfig()

  function apiRequest<T>(url: string, options?: UseFetchOptions<T>) {
    return $fetch<T>(url, { baseURL, ...options })
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
