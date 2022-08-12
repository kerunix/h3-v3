<script lang="ts" setup>
import { useBookingsApi } from '~~/composables/api/useBookingsApi'

const { getFiltered } = useBookingsApi()

const { data } = await getFiltered({
  limit: 3,
  filters: {
    status_in: [
      'BOOKING_CONFIRMED',
      'BOOKING_STANDBY',
      'BOOKING_CLOSED',
      'SUCCESS',
    ],
  },
})
</script>

<template>
  <div class="rounded shadow-md p-3 bg-gray-50 dark:bg-gray-800">
    <BaseHeading level="h2">
      Vos dernières réservations
    </BaseHeading>
    <div
      v-for="{ id, createdAt, guests, start, end } in data"
      :key="id"
    >
      <p class="text-gray-900 dark:text-gray-200">
        {{ createdAt }}
      </p>
      <p class="text-gray-900 dark:text-gray-200">
        Pour {{ guests.length }} personne(s)
      </p>
      <p class="text-gray-900 dark:text-gray-200">
        Du {{ start }} au {{ end }}
      </p>
    </div>
  </div>
</template>
