import type { LoginResponse } from '~~/types'

interface LoginPayload {
  email: string
  password: string
}

const { apiPost } = useApi()

const BASE_URL = '/auth'

export const AuthApi = {
  login: (payload: LoginPayload) => {
    return apiPost<LoginResponse>(`${BASE_URL}/login`, payload)
  },
}
