<template>
  <NuxtLink
    :to="item.href"
    class="group flex items-center px-2 py-2 text-sm font-medium rounded"
    :class="[item.current ? 'font-semibold bg-turquoise-500 text-gray-50 dark:bg-turquoise-900 dark:text-white' : 'text-gray-900 hover:text-gray-700 dark:text-gray-300 hover:bg-turquoise-500/10 dark:hover:text-turquoise-400']"
  >
    <component
      :is="item.icon"
      class="mr-3 flex-shrink-0 h-6 w-6"
      :class="[item.current ? 'text-gray-200' : 'text-gray-500 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-turquoise-300']"
      aria-hidden="true"
    />
    {{ item.name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { INavItem } from '~~/types'

interface Props {
  item: INavItem
}

defineProps<Props>()
</script>
