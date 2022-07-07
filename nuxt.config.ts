import { defineNuxtConfig } from 'nuxt'
import { colorMode, runtimeConfig, vite, vueI18n } from './configs'

/**
 * Don't add any hardcoded config in here, instead extract it in its own file in ./configs and export it from ./configs/index.ts
 * This helps keeping this file clean since it can get pretty messy with time
 */
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@intlify/nuxt3',
    '@nuxtjs/color-mode',
  ],
  buildModules: [
    '@pinia/nuxt',
  ],
  colorMode,
  runtimeConfig,
  vite,
  vueI18n,
})
