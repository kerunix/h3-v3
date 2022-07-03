import type { FunctionalComponent } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'

export interface INavItem {
  name: string
  icon: FunctionalComponent
  href: RouteRecordNormalized
  current: boolean
}
