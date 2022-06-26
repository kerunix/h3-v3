<template>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

function onClick() {
  emit('click')
}
</script>
