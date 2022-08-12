<script lang="ts" setup>
import type { InferType, TestContext } from 'yup'
import { object, string } from 'yup'
import type { AuthCookie } from '~~/types'

type LoginForm = InferType<typeof schema>

const { t } = useI18n()
const { isDark } = useDarkMode()
const { login } = useAuth()
const userStore = useUserStore()

const authCookie = useCookie<AuthCookie>('us-auth', { sameSite: 'lax' })

const schema = object().shape({
  email: string()
    .test(
      'email',
      validateIdentifier,
    ),
  password: string().required('forms.errors.password.required'),
})

const {
  onSubmit,
  submissionErrors,
  isSubmitting,
} = useFormSubmission(submit)

async function submit(form: LoginForm) {
  const { token, user, refreshToken, expiresAt } = await login(form[0])

  authCookie.value = { token, refreshToken, expiresAt, user }

  const loggedInUser = await useUsers().getOne(user)

  userStore.setCurrentUser(loggedInUser)

  if (loggedInUser.roles.includes('ADMIN')) {
    await navigateTo({
      name: 'admin-providers',
    })
    return
  }
  await navigateTo({
    name: 'provider-home',
  })
}

function validateIdentifier(value: string | undefined, { path, createError }: TestContext) {
  let isValid = false
  let message = ''
  isValid = string().required().isValidSync(value)
  if (!isValid) {
    message = 'forms.errors.email.required'
  }
  if (value?.includes('@')) {
    isValid = string().email().required().isValidSync(value)
    if (!isValid) {
      message = 'forms.errors.email.invalid'
    }
  }
  return isValid || createError({ message, path })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-12 py-12 px-4 bg-gray-300 dark:bg-gray-900 sm:px-6 lg:px-8">
    <IconsUSLogoWhiteText
      v-if="isDark"
      class="h-14 md:h-20"
    />
    <IconsUSLogoDarkText
      v-else
      class="h-14 md:h-20"
    />
    <div class="max-w-md w-full space-y-8 p-4 bg-gray-200 dark:bg-gray-800 rounded shadow-md md:p-8">
      <div class="flex flex-col items-center">
        <BaseHeading level="h1">
          {{ t('auth.login.title') }}
        </BaseHeading>
      </div>
      <Form
        v-slot="{ meta }"
        :validation-schema="schema"
        class="mt-8 space-y-6"
        @submit="onSubmit"
      >
        <BaseInput
          name="email"
          type="email"
          :label="t('forms.fields.identifier')"
          autocomplete="email"
          is-required
        />
        <BaseInput
          name="password"
          type="password"
          :label="t('forms.fields.password')"
          autocomplete="current-password"
          is-required
        />
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-300 rounded"
            >
            <label
              for="remember-me"
              class="ml-2 block text-sm text-gray-800 dark:text-gray-100"
            >{{ t('auth.login.remember_me') }}</label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-turquoise-800 dark:text-turquoise-50 hover:text-turquoise-300"
            >{{ t('auth.login.forgot_password') }}</a>
          </div>
        </div>
        <BaseErrorMessage :errors="submissionErrors" />
        <BaseButton
          type="submit"
          :disabled="isSubmitting || !meta.valid"
        >
          {{ t('actions.validate') }}
        </BaseButton>
      </Form>
    </div>
  </div>
</template>
