<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { logout } = useAuth()
const { navigation, onClose, sidebarOpen } = useNavbar()

async function onLogoutClick() {
  await logout()
}
</script>

<template>
  <div>
    <NavMobile
      :sidebar-open="sidebarOpen"
      :nav-items="navigation"
      @sidebar-close="onClose"
    >
      <BaseColorModeSwitcher />
      <BaseLocaleSelect />
    </NavMobile>
    <NavDesktop :nav-items="navigation">
      <div class="flex-shrink-0 flex items-center justify-between p-4">
        <div class="flex space-x-6">
          <BaseColorModeSwitcher />
          <BaseLocaleSelect />
        </div>
        <BaseTooltip
          content="Logout"
          placement="right"
        >
          <button @click="onLogoutClick">
            <span class="sr-only">Logout</span>
            <LogoutIconOutline class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400" />
          </button>
        </BaseTooltip>
      </div>
    </NavDesktop>
    <div class="flex flex-col flex-1 divide-y divide-gray-300 dark:divide-gray-700 md:pl-64 md:divide-none">
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-gray-900">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turquoise-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuIconOutline
            class="h-6 w-6"
            aria-hidden="true"
          />
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
