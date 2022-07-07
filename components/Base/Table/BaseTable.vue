<template>
  <div class="relative overflow-x-auto">
    <div v-if="pending && !error" class="absolute inset-0 my-2 bg-gray-900/20 z-20 rounded flex items-center justify-center">
      <BaseLoader class="text-turquoise-900 h-16 w-16" />
    </div>
    <div class="inline-block min-w-full py-2 align-middle" :class="[pending ? 'opacity-30' : '']">
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5" :class="[paginated && !error ? 'md:rounded-t' : 'rounded']">
        <table class="min-w-full divide-y divide-gray-700">
          <slot :data="items" :pending="pending" />
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

<script setup lang="ts">
import type { PaginationRequest, PaginationState, QueryState } from '~~/types'

interface Props {
  defaultSort: string
  paginated?: boolean
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  paginated: true,
})

const paginationState = reactive<PaginationState>({
  current_page: 1,
  per_page: 10,
  prev_page: null,
  next_page: 2,
  total: 60,
})

const queryState = reactive<QueryState>({
  orderBy: 'id',
  orderDir: 'desc',
  search: '',
  filters: null,
  excludeFromSearch: [],
})

const { apiGet } = useApi()

const headerItems = ref<string[]>([])
const activeItem = ref(props.defaultSort)
const colNumber = computed(() => headerItems.value.length)

const urlWithQuery = computed(() => {
  let url = `${props.url}?page=${paginationState.current_page}&limit=${paginationState.per_page}&orderBy=${queryState.orderBy}&orderDir=${queryState.orderDir}`
  if (queryState.search) {
    url += `$search=${queryState.search}`
  }
  if (queryState.filters) {
    url += `&${Object.keys(queryState.filters)
        .map((field) => {
          let value = queryState.filters![field]
          if (Array.isArray(value)) {
            value = value.join(',')
          }
          // Don't create empty filters.
          if (value.length) {
            return `filters[${field}]=${value}`
          }
          return null
        })
        .filter((filter: string | null) => filter !== null)
        .join('&')}`
  }
  if (queryState.excludeFromSearch.length) {
    url += queryState.excludeFromSearch.map(field => `&excludeFromSearch[${field}]`)
  }
  return url
})

const { data: items, error, refresh, pending } = await useAsyncData<PaginationRequest<any>>(
  props.url,
  () => apiGet<PaginationRequest<any>>(urlWithQuery.value),
)

watch(() => items.value, (newValue) => {
  paginationState.current_page = newValue.current_page
  paginationState.next_page = newValue.next_page
  paginationState.prev_page = newValue.prev_page
  paginationState.per_page = newValue.per_page
  paginationState.total = newValue.total
})

const isEmpty = computed(() => items.value?.data.length === 0)

watch(() => urlWithQuery.value, async () => await refresh())

async function onSort() {
  queryState.orderBy = activeItem.value
  queryState.orderDir = queryState.orderDir === 'desc' ? 'asc' : 'desc'
}

function registerHeaderItem(id: string) {
  headerItems.value.push(id)
}

async function setActiveItem(id: string) {
  activeItem.value = id
  await onSort()
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

provide(TABLE_STATE_KEY, {
  activeItem,
  registerHeaderItem,
  setActiveItem,
  colNumber,
  error,
  isEmpty,
  queryState,
})
</script>
