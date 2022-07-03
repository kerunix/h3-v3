import { parse } from 'cookie'
import type { RouteLocationNormalized } from 'vue-router'
import type { AuthCookie } from '~~/types'

export default defineNuxtRouteMiddleware((from: RouteLocationNormalized) => {
  if (from.name === 'auth-Login') {
    return
  }
  const { setApiAuthToken } = useApi()
  if (process.server) {
    const { cookie } = useRequestHeaders(['cookie'])

    if (!cookie) {
      return navigateTo({ name: 'auth-Login' })
    }
    useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })

    const parsed = parse(cookie)
    if (parsed['us-auth']) {
      const authCookie = JSON.parse(parsed['us-auth'])
      setApiAuthToken(authCookie.token)
    }
  }
  else {
    const cookie = useCookie<AuthCookie>('us-auth')

    setApiAuthToken(cookie.value.token)
  }
})
