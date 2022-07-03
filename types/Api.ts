export interface PaginationRequest<T> {
  current_page: number
  per_page: number
  prev_page: number | null
  next_page: number | null
  total: number
  data: T[]
}

export interface LoginResponse {
  id: number
  user: number
  token: string
  refreshToken: string
  expiresAt: string
}

export interface AuthCookie extends Pick<LoginResponse, 'expiresAt' | 'token' | 'refreshToken'> { }
