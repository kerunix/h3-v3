<script setup lang="ts">
import type { Instance, Placement } from '@popperjs/core'
import { createPopper } from '@popperjs/core'

interface Props {
  content?: string | null
  placement?: Placement
}

const props = withDefaults(defineProps<Props>(), {
  content: null,
  placement: 'auto',
})

const wrapper = ref<HTMLElement>(null)
const tooltip = ref<HTMLElement>(null)

const popperInstance = ref<Instance>(null)

onMounted(() => {
  popperInstance.value = createPopper(wrapper.value, tooltip.value, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
  })
})

onBeforeUnmount(() => popperInstance.value.destroy())

function show() {
  setTimeout(() => {
    tooltip.value.setAttribute('data-show', '')
    popperInstance.value.update()
  }, 300)
}

function hide() {
  setTimeout(() => {
    tooltip.value.removeAttribute('data-show')
  }, 150)
}
</script>

<template>
  <div
    v-bind="$attrs"
    ref="wrapper"
    aria-describedby="tooltip"
    class="flex items-center justify-center"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </div>
  <div
    id="tooltip"
    ref="tooltip"
    class="bg-turquoise-900 text-white rounded text-xs font-semibold px-2 py-1 z-50 shadow-xl"
    role="tooltip"
  >
    <span v-if="content">{{ content }}</span>
    <slot
      v-else
      name="content"
    />
  </div>
</template>

<style lang="postcss" scoped>
#tooltip {
  @apply hidden
}

#tooltip[data-show] {
  @apply block
}
</style>
