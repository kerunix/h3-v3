import { BaseTableHeaderItem } from '~~/.nuxt/components'

interface THItemProps<T> {
  sortable?: boolean
  sortKey?: keyof T
  justify?: 'left' | 'center' | 'right'
}

export function useGenericTableHeaderItem<T = unknown>() {
  return defineComponent((props: THItemProps<T>, { slots }) => {
    return () => h(BaseTableHeaderItem, props, slots)
  })
}
