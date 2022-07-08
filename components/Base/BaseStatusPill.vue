<script lang="ts" setup>
interface Props {
  status: 'MAINTENANCE' | 'ACTIVE' | 'DISABLED'
}

const props = defineProps<Props>()

const classes = computed(() => {
  switch (props.status) {
    case 'MAINTENANCE':
      return 'bg-yellow-100 text-yellow-800'

    case 'DISABLED':
      return 'bg-gray-100 text-gray-800'

    default:
      return 'bg-green-100 text-green-800'
  }
})
</script>

<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium" :class="classes">
    <slot />
  </span>
</template>
