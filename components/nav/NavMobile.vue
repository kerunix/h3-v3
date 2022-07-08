<script lang="ts" setup>
import type { INavItem } from '~~/types'

interface Props {
  sidebarOpen: boolean
  navItems: INavItem[]
}

interface Emits {
  (e: 'sidebarClose'): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const { isDark } = useDarkMode()

function onClose() {
  emit('sidebarClose')
}
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 md:hidden" @close="onClose">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <div class="fixed inset-0 flex z-40">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-200 dark:bg-gray-900">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="onClose">
                  <span class="sr-only">Close sidebar</span>
                  <XIconOutline class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <IconsUSLogoWhiteText v-if="isDark" class="h-8 md:h-14" />
                <IconsUSLogoDarkText v-else class="h-8 md:h-14" />
              </div>
              <nav class="mt-5 px-2 space-y-1">
                <NavItem
                  v-for="item in navItems"
                  :key="item.name"
                  :item="item"
                />
              </nav>
            </div>
            <div v-if="$slots.default" class="flex-shrink-0 flex items-center space-x-6 p-4">
              <slot />
            </div>
            <div class="flex-shrink-0 flex bg-gray-300 dark:bg-gray-700 p-4">
              <a href="#" class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                  </div>
                  <div class="ml-3">
                    <p class="text-base font-medium text-gray-800 dark:text-white">Tom Cook</p>
                    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-600 dark:text-gray-300 group-hover:dark:text-gray-200">View profile</p>
                  </div>
                </div>
              </a>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" />
      </div>
    </Dialog>
  </TransitionRoot>
</template>
