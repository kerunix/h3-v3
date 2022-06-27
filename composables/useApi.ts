import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export default function useApi() {
  const { $http } = useNuxtApp()

  function setApiAuthToken(token: string) {
    $http.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  function apiGet<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return $http.get<T, R, D>(url, config)
  }

  function apiPost<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return $http.post<T, R, D>(url, data, config)
  }

  function apiPatch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return $http.patch<T, R, D>(url, data, config)
  }

  function apiDelete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return $http.delete<T, R, D>(url, config)
  }

  return {
    apiGet,
    apiPost,
    apiPatch,
    apiDelete,
    setApiAuthToken,
  }
}
