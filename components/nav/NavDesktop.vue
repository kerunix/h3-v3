<script lang="ts" setup>
import type { INavItem } from '~~/types'

interface Props {
  navItems: INavItem[]
}

defineProps<Props>()

const { isDark } = useDarkMode()
</script>

<template>
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-gray-300 md:dark:border-gray-700">
    <div class="flex-1 flex flex-col min-h-0 bg-gray-200 dark:bg-gray-900">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <IconsUSLogoWhiteText
            v-if="isDark"
            class="h-8 md:h-14"
          />
          <IconsUSLogoDarkText
            v-else
            class="h-8 md:h-14"
          />
        </div>
        <nav class="mt-5 flex-1 px-2 space-y-1">
          <NavItem
            v-for="item in navItems"
            :key="item.name"
            :item="item"
          />
        </nav>
      </div>
      <template v-if="$slots.default">
        <slot />
      </template>
    </div>
  </div>
</template>
