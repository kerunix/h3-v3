import { FunctionalComponent } from 'vue'

declare module '#app' {
  interface PageMeta {
    title?: string
    routeName?: string,
    icon?: FunctionalComponent,
    isMenuRoute: boolean,
    isAdminRoute: boolean,
  }
}

// It is always important to ensure you import/export something when augmenting a type
export { }