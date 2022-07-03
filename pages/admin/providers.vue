<template>
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
          <BaseTable>
            <BaseTableHeader>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-50 sm:pl-6">
                  <a href="#" class="group inline-flex">
                    ID
                    <span class="invisible ml-2 flex-none rounded text-gray-700 group-hover:visible group-focus:visible">
                      <ChevronDownIconOutline class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-50 sm:pl-6">
                  <a href="#" class="group inline-flex">
                    Name
                    <span class="invisible ml-2 flex-none rounded text-gray-700 group-hover:visible group-focus:visible">
                      <ChevronDownIconOutline class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50">
                  <a href="#" class="group inline-flex">
                    Status
                    <span class="ml-2 flex-none rounded bg-gray-700 text-gray-900 dark:text-gray-50 group-hover:bg-gray-900 group-hover:text-turquoise-500">
                      <ChevronDownIconOutline class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50">
                  <a href="#" class="group inline-flex">
                    Email
                    <span class="invisible ml-2 flex-none rounded text-gray-700 group-hover:visible group-focus:visible">
                      <ChevronDownIconOutline class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-700 group-hover:visible group-focus:visible" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50">
                  <a href="#" class="group inline-flex">
                    Customer
                    <span class="invisible ml-2 flex-none rounded text-gray-700 group-hover:visible group-focus:visible">
                      <ChevronDownIconOutline class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-700 group-hover:visible group-focus:visible" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th scope="col" class="pl-3 pr-5 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-50">
                  <span>Actions</span>
                </th>
              </tr>
            </BaseTableHeader>
            <tbody v-if="providers?.data" class="divide-y divide-gray-700/40 bg-gray-100 dark:bg-gray-800">
              <tr v-for="provider in providers.data" :key="provider.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-50 sm:pl-6">
                  {{ provider.id }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                  {{ provider.name }}
                </td>
                <td class="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                  <BaseStatusPill :status="provider.status">
                    {{ provider.status }}
                  </BaseStatusPill>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {{ provider.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {{ provider.legalContactLastname }} {{ provider.legalContactFirstname }}
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" class="text-turquoise-500 hover:text-turquoise-700">Edit<span class="sr-only">, {{ provider.name }}</span></a>
                </td>
              </tr>
            </tbody>
          </BaseTable>
        </div>
      </div>
    </div>
    {{ error }}
    <BaseButton @click="refresh">
      Refresh
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/outline'
import type { PaginationRequest } from '~~/types'

const { apiGet } = useApi()

const { data: providers, error, refresh } = await useAsyncData(
  'providers',
  () => apiGet<PaginationRequest<Models.Provider>>('/providers'),
  {
    transform: data => data.data,
  },
)

definePageMeta({
  title: 'admin.providers_page.title',
  layout: 'admin',
  routeName: 'routes.providers',
  icon: HomeIcon,
  isMenuRoute: true,
})
</script>
