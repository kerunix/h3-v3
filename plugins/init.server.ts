import { parse } from 'cookie'
import type { AuthCookie } from '~~/types'

type ParsedCookies = Record<string, string>

async function setupAuth(parsedCookies: ParsedCookies) {
  const router = useRouter()
  const { getOne: getUser } = useUsersApi()
  const { getAll: getDomain } = useDomainsApi()

  // If no cookies were parsed, redirect to login
  if (!parsedCookies['us-auth']) {
    await router.push({ name: 'auth-login' })
    return
  }

  // Parse the cookie from json and persist it in the SSR friendly cookie state using `useCookie`
  const authCookie: AuthCookie = JSON.parse(parsedCookies['us-auth'])
  const frontCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })
  frontCookie.value = authCookie

  // Get the connected user and set up basic user store
  const user = await getUser(authCookie.user)
  useUserStore().setCurrentUser(user)

  // If the user is a provider, fetch the domain and persist it
  if (user.roles.includes('USER')) {
    const domain = await getDomain()[0]
    useDomainStore().setCurrentDomain(domain)
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
