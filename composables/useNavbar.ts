import type { RouteRecordNormalized } from 'vue-router'
import type { INavItem } from '~~/types'

function filterRouteForRole(route: RouteRecordNormalized, isAdmin: boolean) {
  return (route.meta.isAdminRoute && isAdmin) || (!route.meta.isAdminRoute && !isAdmin)
}

export default function useNavbar() {
  const { getRoutes } = useRouter()
  const currentRoute = useRoute()
  const { t } = useI18n()

  function getMenuItemsFromRoutes(route: RouteRecordNormalized) {
    return {
      name: t(route.meta.routeName),
      icon: route.meta.icon,
      href: route,
      current: currentRoute.meta.routeName === route.meta.routeName,
    }
  }

  const userState = useUserStore()

  const navigation = ref<INavItem[]>([])
  const sidebarOpen = ref(false)

  const isAdmin = userState.getCurrentUser.roles.includes('ADMIN')

  watchEffect(() => {
    navigation.value = getRoutes()
      .filter(r => r.meta.isMenuRoute)
      .filter(r => filterRouteForRole(r, isAdmin))
      .map(r => getMenuItemsFromRoutes(r))
    sidebarOpen.value = false
  })

  function onClose() {
    sidebarOpen.value = false
  }

  return {
    navigation,
    sidebarOpen,
    onClose,
  }
}
