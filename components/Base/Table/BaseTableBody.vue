<script lang="ts" setup>
const { colNumber, error, isEmpty } = injectStrict(TABLE_STATE_KEY)
</script>

<template>
  <tbody class="w-full divide-y divide-gray-700/40 bg-gray-100 dark:bg-gray-800">
    <tr v-if="error">
      <td :colspan="colNumber" class="w-full px-9 py-5">
        <BaseErrorMessage :errors="['An error happened']" />
      </td>
    </tr>
    <tr v-else-if="isEmpty">
      <td :colspan="colNumber" class="w-full px-9 py-5">
        <div class="w-full rounded border bg-turquoise-100/20 text-gray-900 border-turquoise-900 dark:text-white px-3 py-2">
          This query returned no data, maybe go ahead and try again, or add the data you miss ?
        </div>
      </td>
    </tr>
    <slot v-else />
  </tbody>
</template>
