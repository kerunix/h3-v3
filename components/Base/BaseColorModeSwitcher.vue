<script lang="ts" setup>
const { isDark, toggleColorMode } = useDarkMode()
</script>

<template>
  <BaseTooltip>
    <button @click="toggleColorMode">
      <SunIconOutline
        v-if="isDark"
        class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400"
      />
      <MoonIconOutline
        v-else
        class="h-6 w-6 text-gray-800 hover:text-turquoise-900 dark:text-gray-300 dark:hover:text-turquoise-400"
      />
    </button>
    <template #content>
      {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </template>
  </BaseTooltip>
</template>
