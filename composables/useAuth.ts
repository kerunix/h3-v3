import type { AuthCookie, LoginResponse } from '~~/types'

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

  async function logout() {
    const authCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })
    authCookie.value = null

    await navigateTo({ name: 'auth-login' })
  }

  return {
    login,
    logout,
  }
}
