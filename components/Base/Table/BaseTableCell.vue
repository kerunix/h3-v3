<script setup lang="ts">
interface Props {
  data?: string | number
  emphasize?: boolean
  justify?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  emphasize: false,
  justify: 'left',
})

const alignmentClasses = computed(() => {
  switch (props.justify) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
})
</script>

<template>
  <td
    class="whitespace-nowrap px-4 py-4 text-sm md:px-6 md:py-5"
    :class="[
      emphasize ? 'text-gray-900 dark:text-gray-100 font-semibold' : 'text-gray-600 dark:text-gray-400',
      alignmentClasses,
    ]"
  >
    <template v-if="!$slots.default">
      {{ data }}
    </template>
    <slot v-else />
  </td>
</template>
