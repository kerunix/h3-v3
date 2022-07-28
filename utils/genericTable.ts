import type { VNode } from 'vue'
import { BaseTable } from '~~/.nuxt/components'

interface TableSlotProps<T> {
  data: T[]
}

interface TableProps<T> {
  defaultSort: keyof T
  paginated?: boolean
  searchable?: boolean
  url: string
}

export function useGenericTable<T = unknown>() {
  const wrapper = defineComponent((props: TableProps<T>, { slots }) => {
    return () => h(BaseTable, props, slots)
  })

  return wrapper as typeof wrapper & {
    new(): {
      $slots: {
        default: (arg: TableSlotProps<T>) => VNode[]
      }
    }
  }
}
