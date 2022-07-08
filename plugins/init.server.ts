import { parse } from 'cookie'
import type { AuthCookie } from '~~/types'

type ParsedCookies = Record<string, string>

async function setupAuth(parsedCookies: ParsedCookies) {
  const { setApiAuthToken } = useApi()
  const router = useRouter()

  if (!parsedCookies['us-auth']) {
    await router.push({ name: 'auth-login' })
    return
  }

  const authCookie: AuthCookie = JSON.parse(parsedCookies['us-auth'])
  const frontCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })

  frontCookie.value = authCookie
  setApiAuthToken(authCookie.token)
  // TODO: uncomment when we figure out a way to prevent 401 in Vacation if the request comes from Nitro
  // const user = await apiGet(`/users/${authCookie.user}`)
}

async function setupContextFromCookies(parsed: ParsedCookies) {
  await setupAuth(parsed)
}

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { ssrContext: { event: { req: { headers: { cookie } } } } } = nuxtApp

    if (cookie) {
      const parsed = parse(cookie)

      await setupContextFromCookies(parsed)
      return
    }
    throwError('Unauthenticated')
  }
  catch (error) {
    console.error(error)
    const router = useRouter()

    await router.push({ name: 'auth-login' })
  }
})
