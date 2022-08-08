<script setup lang="ts">
import type { TableState } from '~~/types'

interface Props {
  defaultSort: keyof Models.BaseEntity
  paginated?: boolean
  searchable?: boolean
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  paginated: true,
  searchable: true,
})

const headerItems = ref<(keyof Models.BaseEntity | never)[]>([])
const activeItem = ref<keyof Models.BaseEntity>(props.defaultSort)
const colNumber = computed(() => headerItems.value.length)

const { data: items, error, paginationState, pending, queryState } = await usePaginatedRequests<Models.BaseEntity>('providers')

const isEmpty = computed(() => items.value?.data?.length === 0)

function registerHeaderItem(key: keyof Models.BaseEntity) {
  headerItems.value.push(key)
}

async function setActiveItem(key: keyof Models.BaseEntity) {
  activeItem.value = key
  onSort()
}

function onSort() {
  queryState.orderBy = activeItem.value
  queryState.orderDir = queryState.orderDir === 'desc' ? 'asc' : 'desc'
}

function onGoNext() {
  paginationState.current_page = paginationState.current_page + 1
}

function onGoPrevious() {
  paginationState.current_page = paginationState.current_page - 1
}

function onGoToPage(page: number) {
  paginationState.current_page = page
}

provide<TableState<Models.BaseEntity>>(TABLE_STATE_KEY, {
  activeItem,
  registerHeaderItem,
  setActiveItem,
  colNumber,
  error,
  isEmpty,
  queryState,
})
</script>

<template>
  <BaseTableSearch v-model="queryState.search" />
  <div class="relative overflow-x-auto">
    <div
      v-if="pending && !error"
      class="absolute inset-0 my-2 bg-gray-900/20 z-20 rounded flex items-center justify-center"
    >
      <BaseLoader class="text-turquoise-900 h-16 w-16" />
    </div>
    <div
      class="inline-block min-w-full py-2 align-middle"
      :class="[pending ? 'opacity-30' : '']"
    >
      <div
        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5"
        :class="[paginated && !error ? 'md:rounded-t' : 'rounded']"
      >
        <table class="min-w-full divide-y divide-gray-700">
          <slot :data="items?.data" />
        </table>
      </div>
      <template v-if="paginated && !error">
        <BaseTablePagination
          :pagination-state="paginationState"
          @go-previous="onGoPrevious"
          @go-next="onGoNext"
          @go-to-page="onGoToPage"
        />
      </template>
    </div>
  </div>
</template>
