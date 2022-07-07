export interface LoginResponse {
  id: number
  user: number
  token: string
  refreshToken: string
  expiresAt: string
}

export interface AuthCookie extends Pick<LoginResponse, 'expiresAt' | 'token' | 'refreshToken'> { }
