import axios from 'axios'

export default defineNuxtPlugin(() => {
  const { public: { apiBaseUrl: baseURL } } = useRuntimeConfig()

  const http = axios.create({
    baseURL,
  })

  // Additional axios config here
  // Note that this plugin can also be a 'nested' plugin in a subdirectory to avoid bloating `defineNuxtPlugin`
  // See => https://v3.nuxtjs.org/guide/directory-structure/plugins

  return {
    provide: {
      http,
    },
  }
})
