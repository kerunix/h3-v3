import type { UseFetchOptions } from '#app'

export interface LoginResponse {
  id: number
  user: number
  token: string
  refreshToken: string
  expiresAt: string
}

export interface AuthCookie extends Pick<LoginResponse, 'expiresAt' | 'token' | 'refreshToken' | 'user'> { }

export interface ExtendedFetchOptions<T> extends UseFetchOptions<T> {
  authenticated?: boolean
}
