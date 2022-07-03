<template>
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-gray-300 md:dark:border-gray-700">
    <div class="flex-1 flex flex-col min-h-0 bg-gray-200 dark:bg-gray-900">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <IconsUSLogoWhiteText v-if="isDark" class="h-8 md:h-14" />
          <IconsUSLogoDarkText v-else class="h-8 md:h-14" />
        </div>
        <nav class="mt-5 flex-1 px-2 space-y-1">
          <NavItem
            v-for="item in navItems"
            :key="item.name"
            :item="item"
          />
        </nav>
      </div>
      <div v-if="$slots.default" class="flex-shrink-0 flex items-center space-x-6 p-4">
        <slot />
      </div>
      <div class="flex-shrink-0 flex bg-gray-300 dark:bg-gray-700 p-4">
        <a href="#" class="flex-shrink-0 w-full group block">
          <div class="flex items-center">
            <div>
              <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-800 dark:text-white">Tom Cook</p>
              <p class="text-xs font-medium text-gray-700 group-hover:text-gray-600 dark:text-gray-300 group-hover:dark:text-gray-200">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { INavItem } from '~~/types'

interface Props {
  navItems: INavItem[]
}

defineProps<Props>()

const { isDark } = useDarkMode()
</script>
