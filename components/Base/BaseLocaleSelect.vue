<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const supportedLocales = ['en', 'fr']

const selectedLocale = useVModel(props, 'modelValue', emit)
</script>

<template>
  <Listbox v-model="selectedLocale">
    <div class="relative">
      <ListboxButton>{{ selectedLocale.toUpperCase() }}</ListboxButton>
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
