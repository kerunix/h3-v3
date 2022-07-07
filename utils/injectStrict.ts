import type { InjectionKey } from 'vue'
import { inject } from 'vue'

/**
 * Overloads Vue's `inject` to deal with potential `undefined` values.
 * @param key Injection key
 * @param fallback Default value
 * @returns The injected value
 * @throws `Could not resolve key` if injected object is undefined
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
