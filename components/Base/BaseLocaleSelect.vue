<script lang="ts" setup>
const { locale: currentLocale } = useI18n()

const supportedLocales = ['en', 'fr']

const storedLocale = useCookie('us-locale', { sameSite: 'lax', default: () => currentLocale.value })

watchEffect(() => currentLocale.value = storedLocale.value)
</script>

<template>
  <Listbox v-model="storedLocale">
    <div class="relative">
      <ListboxButton class="p-2 rounded text-gray-800 dark:text-gray-50 hover:bg-gray-200 hover:dark:bg-gray-700">
        {{ storedLocale.toUpperCase() }}
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute bottom-10 bg-white dark:bg-gray-900 shadow rounded">
          <ListboxOption
            v-for="locale in supportedLocales"
            :key="locale"
            :value="locale"
            class="hover:cursor-pointer p-2 text-gray-800 dark:text-gray-50 hover:bg-gray-200 hover:dark:bg-gray-700 hover:rounded"
          >
            {{ locale.toUpperCase() }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
