<script lang="ts" setup>
interface Props {
  sortable?: boolean
}

withDefaults(defineProps<Props>(), {
  sortable: true,
})
</script>

<template>
  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-50 sm:pl-6">
    <a href="#" class="group inline-flex">
      ID
      <span v-if="sortable" class="invisible ml-2 flex-none rounded text-gray-700 group-hover:visible group-focus:visible">
        <ChevronDownIconOutline class="h-5 w-5" aria-hidden="true" />
      </span>
    </a>
  </th>
</template>
