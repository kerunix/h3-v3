import type { InjectionKey } from 'vue'
import type { TableState } from '~~/types'

export const TABLE_STATE_KEY: InjectionKey<TableState> = Symbol('table-state')
