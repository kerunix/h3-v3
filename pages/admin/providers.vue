<script setup lang="ts">
import { UserGroupIcon } from '@heroicons/vue/outline'
import { useGenericTable } from '~~/utils'

const ProvidersTable = useGenericTable<Models.Provider>()
const ProviderHeaderItem = useGenericTableHeaderItem<Models.Provider>()

definePageMeta({
  title: 'admin.providers_page.title',
  layout: 'admin',
  routeName: 'routes.providers',
  icon: UserGroupIcon,
  isMenuRoute: true,
  isAdminRoute: true,
})
</script>

<template>
  <div class="mt-8 flex flex-col">
    <ProvidersTable
      v-slot="{ data: providers }"
      default-sort="id"
      url="providers"
    >
      <BaseTableHeader>
        <tr>
          <ProviderHeaderItem sort-key="id">
            ID
          </ProviderHeaderItem>
          <ProviderHeaderItem sort-key="name">
            Name
          </ProviderHeaderItem>
          <ProviderHeaderItem sort-key="status">
            Status
          </ProviderHeaderItem>
          <ProviderHeaderItem sort-key="email">
            Email
          </ProviderHeaderItem>
          <ProviderHeaderItem :sortable="false">
            Customer
          </ProviderHeaderItem>
          <ProviderHeaderItem
            :sortable="false"
            justify="right"
          >
            <span>Actions</span>
          </ProviderHeaderItem>
        </tr>
      </BaseTableHeader>
      <BaseTableBody>
        <tr
          v-for="provider in providers"
          :key="provider.id"
        >
          <BaseTableCell
            :data="provider.id"
            emphasize
          />
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
            <a
              href="#"
              class="text-turquoise-500 hover:text-turquoise-700"
            >Edit<span class="sr-only">, {{ provider.name }}</span></a>
          </BaseTableCell>
        </tr>
      </BaseTableBody>
    </ProvidersTable>
  </div>
</template>
