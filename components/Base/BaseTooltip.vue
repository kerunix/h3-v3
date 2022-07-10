<script setup lang="ts">
import Popper from 'vue3-popper'
</script>

<template>
  <Popper v-bind="$attrs" arrow placement="auto" hover open-delay="100" close-delay="100">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<style lang="postcss" scoped>
  :deep(.popper) {
    @apply py-1 px-2 bg-turquoise-900 text-white text-sm rounded shadow-md hover:bg-turquoise-900;
  }

  :deep(.popper #arrow::before) {
    @apply bg-turquoise-900
  }

  :deep(.popper:hover),
  :deep(.popper:hover > #arrow::before) {
    @apply bg-turquoise-900;
  }
</style>
