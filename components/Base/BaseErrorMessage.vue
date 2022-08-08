<script setup lang="ts">
interface Props {
  errors: (string | undefined)[]
}

const props = defineProps<Props>()

const errorsWithMessages = computed(() => {
  const filtered = props.errors.filter(error => error && error.length > 0)
  return filtered.length > 0 ? filtered : null
})
</script>

<template>
  <div
    v-if="errors.length"
    class="w-full bg-red-200 text-red-800 rounded border border-red-500 px-3 py-2"
  >
    <template v-if="errorsWithMessages">
      <p v-if="errorsWithMessages.length > 1">
        Des erreurs sont survenues:
      </p>
      <p v-else>
        Une erreur est survenue:
      </p>
      <ul class="pl-6 list-disc">
        <li
          v-for="(error, index) in errorsWithMessages"
          :key="index"
        >
          {{ error }}
        </li>
      </ul>
    </template>

    <template v-else>
      <p>Une erreur inconnue est survenue.</p>
    </template>
  </div>
</template>
