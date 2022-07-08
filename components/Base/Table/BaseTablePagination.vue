<script lang="ts" setup>
import type { ComputedRef } from 'vue'

interface Props {
  paginationState: {
    current_page: number
    per_page: number
    prev_page: number | null
    next_page: number | null
    total: number | null
  }
}

interface Emits {
  (e: 'goPrevious'): void
  (e: 'goNext'): void
  (e: 'goToPage', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const from = computed(() => (props.paginationState.per_page * (props.paginationState.current_page - 1)) + 1)
const to = computed(() => {
  const to = props.paginationState.current_page * props.paginationState.per_page
  return to > props.paginationState.total ? props.paginationState.total : to
})
const totalPages = computed(() => Math.ceil(props.paginationState.total / props.paginationState.per_page))

const paginationLinks: ComputedRef<(number | null)[]> = computed(() => {
  if (totalPages.value < 5) {
    return Array.from(Array(totalPages.value).keys(), n => n + 1)
  }
  if (props.paginationState.current_page > totalPages.value - 3) {
    return [
      1,
      null,
      totalPages.value - 2,
      totalPages.value - 1,
      totalPages.value,
    ]
  }
  if (props.paginationState.current_page > 3) {
    return [
      1,
      null,
      props.paginationState.current_page - 1,
      props.paginationState.current_page,
      props.paginationState.current_page + 1,
      null,
      totalPages.value,
    ]
  }
  return [
    1,
    2,
    3,
    null,
    totalPages.value,
  ]
})

function onGoPrevious() {
  if (props.paginationState.current_page > 1) {
    emit('goPrevious')
  }
}

function onGoNext() {
  if (props.paginationState.current_page < totalPages.value) {
    emit('goNext')
  }
}

function onGoToPage(page: number) {
  if (page !== props.paginationState.current_page) {
    emit('goToPage', page)
  }
}
</script>

<template>
  <div class="w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 shadow ring-1 ring-black ring-opacity-5 md:rounded-b">
    <div class="flex-1 flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-200">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ from }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ to }}</span>
          <template v-if="paginationState.total">
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">{{ paginationState.total }}</span>
            {{ ' ' }}
            results
          </template>
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-800 text-gray-900 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:text-gray-300 hover:bg-turquoise-500/10 dark:hover:text-turquoise-400"
            @click="onGoPrevious"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIconOutline class="h-5 w-5" aria-hidden="true" />
          </button>
          <template v-for="(page, index) in paginationLinks" :key="index">
            <button
              v-if="page"
              :class="[paginationState.current_page === page ? 'bg-turquoise-500 text-gray-50 dark:bg-turquoise-900 dark:text-white' : 'text-gray-900 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:text-gray-300 hover:bg-turquoise-500/10 dark:hover:text-turquoise-400']"
              class="inline-flex relative items-center px-4 py-2 border text-sm border-gray-300 dark:border-gray-800"
              @click="onGoToPage(page)"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 border text-sm border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            >
              ...
            </span>
          </template>
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-800 text-gray-900 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 dark:text-gray-300 hover:bg-turquoise-500/10 dark:hover:text-turquoise-400"
            @click="onGoNext"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIconOutline class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
