<template>
  <div class="space-y-2">
    <label :for="name" class="text-gray-100">
      {{ label }}
      <span v-if="isRequired">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="name"
      v-model.trim="value"
      :name="name"
      :type="type"
      :required="isRequired"
      class="appearance-none rounded relative block w-full px-3 py-2 border-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-turquoise-500 focus:ring-2 focus:ring-offset-transparent focus:ring-offset-2"
      :class="[translatedErrorMessage ? 'border-red-300' : 'border-transparent']"
    >
    <span v-if="translatedErrorMessage" class="text-red-700">{{ translatedErrorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  name: string
  isRequired?: boolean
  type?: 'search' | 'email' | 'password' | 'text' | 'tel' | 'url'
}

const props = withDefaults(defineProps<Props>(), {
  isRequired: false,
  type: 'text',
})

const { t } = useI18n()

const { value, errorMessage } = useField(props.name)

const translatedErrorMessage = computed(() => errorMessage.value ? t(errorMessage.value) : null)
</script>
