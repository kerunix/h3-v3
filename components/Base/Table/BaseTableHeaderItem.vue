<script lang="ts" setup>
import type { TableState } from '~~/types'

interface Props {
  sortable?: boolean
  sortKey?: string
  justify?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  sortable: true,
  sortKey: '',
  justify: 'left',
})

const {
  registerHeaderItem,
  activeItem,
  setActiveItem,
  queryState,
} = injectStrict<TableState<Models.BaseEntity>>(TABLE_STATE_KEY)

const isActive = computed(() => activeItem.value === props.sortKey)

registerHeaderItem(props.sortKey)

function onClick() {
  setActiveItem(props.sortKey)
}

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

onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    if (props.sortable && props.sortKey.length === 0) {
      console.warn('[HR TABLE ITEM] => You required this item to be sortable but didnt provide a sortKey.')
    }
  }
})
</script>

<template>
  <th
    scope="col"
    class="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-50 md:px-6 md:py-5"
    :class="alignmentClasses"
  >
    <button
      class="group inline-flex"
      @click="onClick"
    >
      <slot />
      <span
        v-if="sortable"
        class="ml-2 flex-none rounded"
        :class="[isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-400']"
      >
        <ChevronDownIconOutline
          v-if="queryState.orderDir === 'desc'"
          class="h-5 w-5"
          aria-hidden="true"
        />
        <ChevronUpIconOutline
          v-else
          class="h-5 w-5"
          aria-hidden="true"
        />
      </span>
    </button>
  </th>
</template>
