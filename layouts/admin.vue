<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { INavItem } from '~~/types'

const { t, locale } = useI18n()
const { getRoutes } = useRouter()
const storedLocale = useStorage('us-locale', locale)
const route = useRoute()

const { isDark, toggleColorMode } = useDarkMode()

locale.value = storedLocale.value

const navigation = ref<INavItem[]>([])
const sidebarOpen = ref(false)

watchEffect(() => {
  navigation.value = getRoutes()
    .filter(r => r.meta.isMenuRoute)
    .map((r) => {
      return {
        name: t(r.meta.routeName),
        icon: r.meta.icon,
        href: r,
        current: route.meta.routeName === r.meta.routeName,
      }
    })
  sidebarOpen.value = false
})

function onClose() {
  sidebarOpen.value = false
}
</script>

<template>
  <div>
    <NavMobile
      :sidebar-open="sidebarOpen"
      :nav-items="navigation"
      @sidebar-close="onClose"
    >
      <button @click="toggleColorMode">
        <MoonIconOutline v-if="isDark" class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400" />
        <SunIconOutline v-else class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400" />
      </button>
      <BaseLocaleSelect v-model="storedLocale" />
    </NavMobile>
    <NavDesktop :nav-items="navigation">
      <button @click="toggleColorMode">
        <MoonIconOutline v-if="isDark" class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400" />
        <SunIconOutline v-else class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400" />
      </button>
      <BaseLocaleSelect v-model="storedLocale" />
    </NavDesktop>
    <div class="flex flex-col flex-1 divide-y divide-gray-300 dark:divide-gray-700 md:pl-64 md:divide-none">
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-gray-900">
        <button type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turquoise-500" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <MenuIconOutline class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1 min-h-screen bg-gray-200 dark:bg-gray-900">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BaseHeading level="h1">
              {{ t(route.meta.title) }}
            </BaseHeading>
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
