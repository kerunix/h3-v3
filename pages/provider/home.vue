<script lang="ts" setup>
import { HomeIcon } from '@heroicons/vue/outline'

definePageMeta({
  title: 'provider.home_page.title',
  layout: 'providers',
  routeName: 'routes.home',
  icon: HomeIcon,
  isMenuRoute: true,
  isAdminRoute: false,
})
</script>

<template>
  <DomainsLastBookings />
</template>
