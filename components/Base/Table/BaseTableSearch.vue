<script lang="ts" setup>
interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string)
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const query = useVModel(props, 'modelValue', emit)

function onClearQuery() {
  query.value = ''
}
</script>

<template>
  <div class="w-full flex items-center ">
    <div class="relative w-md">
      <SearchIconOutline class="pointer-events-none absolute top-3 right-4 h-5 w-5 text-gray-300 z-10" aria-hidden="true" />
      <input
        v-bind="$attrs"
        id="table-search"
        v-model.trim="query"
        type="search"
        placeholder="Search"
        class="appearance-none rounded relative block w-full px-3 py-2 border-2 placeholder-gray-500 text-gray-900 dark:bg-gray-600 dark:placeholder-gray-200 dark:text-gray-100 border-transparent focus:outline-none focus:ring-turquoise-500 focus:ring-2 focus:ring-offset-transparent focus:ring-offset-2"
      >
    </div>
    <BaseTooltip>
      <button v-if="query" class="ml-4 rounded-full p-1 text-gray-600 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-400 hover:dark:bg-gray-600 hover:dark:text-gray-100" @click="onClearQuery">
        <XIconOutline class="h-6 w-6" />
      </button>
      <template #content>
        Clear Search
      </template>
    </BaseTooltip>
  </div>
</template>
