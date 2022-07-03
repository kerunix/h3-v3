<template>
  <table class="min-w-full divide-y divide-gray-700">
    <slot />
  </table>
</template>

<script setup lang="ts">
const headerItems = ref<string[]>([])

function registerHeaderItem(uuid: string) {

}
</script>
