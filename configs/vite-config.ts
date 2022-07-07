import type { UserConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export const vite: UserConfig = {
  plugins: [
    Components({
      resolvers: [
        HeadlessUiResolver(),
        (name) => {
          if (name.includes('IconSolid')) {
            const realName = name.split('Solid')[0]
            return {
              name: realName,
              from: '@heroicons/vue/solid',
            }
          }
          if (name.includes('IconOutline')) {
            const realName = name.split('Outline')[0]
            return {
              name: realName,
              from: '@heroicons/vue/outline',
            }
          }
        },
        (name) => {
          if (['Form', 'Field', 'ErrorMessage', 'FieldArray'].includes(name)) {
            return {
              name,
              from: 'vee-validate',
            }
          }
        },
      ],
    }),
    AutoImport({
      dts: 'types/shims/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: [
        'pinia',
        'vue-i18n',

        {
          'vee-validate': ['useField'],
          '@vueuse/core': [
            'useToggle',
            'useVModel',
          ],
        },
      ],
      dirs: [
        './stores',
        './utils',
        './configs',
        './constants',
      ],
    }),
  ],
}
