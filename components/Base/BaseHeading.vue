<script lang="ts" setup>
interface Props {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = defineProps<Props>()

const classes = computed(() => {
  switch (props.level) {
    case 'h1':
      return 'text-4xl font-semibold text-gray-900 dark:text-gray-100'

    default:
      return ''
  }
})
</script>

<template>
  <component :is="level" :class="classes">
    <slot />
  </component>
</template>
