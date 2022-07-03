<template>
  <button
    v-bind="$attrs"
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-turquoise-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:bg-turquoise-300 hover:bg-turquoise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500"
  >
    <slot />
  </button>
</template>
