<script setup lang="ts">
import { UserGroupIcon } from '@heroicons/vue/outline'

definePageMeta({
  title: 'admin.providers_page.title',
  layout: 'admin',
  routeName: 'routes.providers',
  icon: UserGroupIcon,
  isMenuRoute: true,
})
</script>

<template>
  <div class="mt-8 flex flex-col">
    <!-- <BaseTable
      v-slot="{ data: providers }"
      default-sort="id"
      url="providers"
    >
      <BaseTableHeader>
        <tr>
          <BaseTableHeaderItem sort-key="id">
            ID
          </BaseTableHeaderItem>
          <BaseTableHeaderItem sort-key="name">
            Name
          </BaseTableHeaderItem>
          <BaseTableHeaderItem sort-key="status">
            Status
          </BaseTableHeaderItem>
          <BaseTableHeaderItem sort-key="email">
            Email
          </BaseTableHeaderItem>
          <BaseTableHeaderItem sort-key="customer">
            Customer
          </BaseTableHeaderItem>
          <BaseTableHeaderItem :sortable="false" justify="right">
            <span>Actions</span>
          </BaseTableHeaderItem>
        </tr>
      </BaseTableHeader>
      <BaseTableBody>
        <tr v-for="provider in providers" :key="provider.id">
          <BaseTableCell :data="provider.id" emphasize />
          <BaseTableCell :data="provider.name" />
          <BaseTableCell>
            <BaseStatusPill :status="provider.status">
              {{ provider.status }}
            </BaseStatusPill>
          </BaseTableCell>
          <BaseTableCell :data="provider.email" />
          <BaseTableCell>
            {{ provider.legalContactLastname }} {{ provider.legalContactFirstname }}
          </BaseTableCell>
          <BaseTableCell justify="right">
            <a href="#" class="text-turquoise-500 hover:text-turquoise-700">Edit<span class="sr-only">, {{ provider.name }}</span></a>
          </BaseTableCell>
        </tr>
      </BaseTableBody>
    </BaseTable> -->
  </div>
</template>
