import { defineNuxtConfig } from 'nuxt'
import { runtimeConfig, vite, vueI18n } from './configs'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@intlify/nuxt3',
  ],
  vite,
  runtimeConfig,
  vueI18n,
})
