import type { LoginResponse } from '~~/types'

interface LoginPayload {
  email: string
  password: string
}

export default function useAuth() {
  const { apiPost } = useApi()

  const BASE_URL = '/auth'

  function login(payload: LoginPayload) {
    return apiPost<LoginResponse>(`${BASE_URL}/login`, payload)
  }

  return {
    login,
  }
}
