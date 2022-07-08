<script lang="ts" setup>
const { locale } = useI18n()

const supportedLocales = ['en', 'fr']

const storedLocale = useStorage('us-locale', locale)
locale.value = storedLocale.value
</script>

<template>
  <Listbox v-model="storedLocale">
    <div class="relative">
      <ListboxButton>{{ storedLocale.toUpperCase() }}</ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute bottom-10 bg-white dark:bg-gray-900 shadow rounded">
          <ListboxOption
            v-for="possibleLocale in supportedLocales"
            :key="possibleLocale"
            :value="possibleLocale"
            class="hover:cursor-pointer p-2 text-gray-800 dark:text-gray-50 hover:bg-gray-200 hover:dark:bg-gray-700 hover:rounded"
          >
            {{ possibleLocale.toUpperCase() }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
