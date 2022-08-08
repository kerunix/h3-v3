<script lang="ts" setup>
interface Props {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = defineProps<Props>()

const classes = computed(() => {
  switch (props.level) {
    case 'h1':
      return 'text-4xl uppercase font-semibold font-title text-gray-900 dark:text-gray-100'
    case 'h2':
      return 'text-3xl font-semibold font-title text-gray-900 dark:text-gray-100'
    case 'h3':
      return 'text-2xl font-semibold font-title text-gray-900 dark:text-gray-100'
    case 'h4':
      return 'text-xl font-semibold font-title text-gray-900 dark:text-gray-100'
    case 'h5':
      return 'text-lg font-semibold font-title text-gray-900 dark:text-gray-100'
    default:
      return 'font-semibold font-title text-gray-900 dark:text-gray-100'
  }
})
</script>

<template>
  <component
    :is="level"
    :class="classes"
  >
    <slot />
  </component>
</template>
