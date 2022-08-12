import { parse } from 'cookie'
import type { AuthCookie } from '~~/types'

type ParsedCookies = Record<string, string>

async function setupAuth(parsedCookies: ParsedCookies) {
  const router = useRouter()
  const { apiGet } = useApi()
  const userStore = useUserStore()

  // If no cookies were parsed, redirect to login
  if (!parsedCookies['us-auth']) {
    await router.push({ name: 'auth-login' })
    return
  }

  // Parse the cookie from json and save it in the SSR friendly cookie state using `useCookie`
  const authCookie: AuthCookie = JSON.parse(parsedCookies['us-auth'])
  const frontCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })
  frontCookie.value = authCookie

  // Get the connected user and set up basic user store
  const user = await apiGet<Models.User>(`/users/${authCookie.user}`)
  userStore.setCurrentUser(user)

  if (user.roles.includes('USER')) {
    // TODO: fetch domain and save it in state
  }
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
    const router = useRouter()

    await router.push({ name: 'auth-login' })
  }
  catch (error) {
    console.error(error)
    const router = useRouter()

    await router.push({ name: 'auth-login' })
  }
})
