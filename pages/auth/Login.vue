<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-12 py-12 px-4 bg-slate-900 sm:px-6 lg:px-8">
    <IconsUSLogoText class="h-14 md:h-20" />
    <div class="max-w-md w-full space-y-8 p-4 bg-slate-800 rounded shadow-md md:p-8">
      <div class="flex flex-col items-center">
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-50">
          {{ t('auth.login.title') }}
        </h1>
      </div>
      <Form
        :validation-schema="schema"
        class="mt-8 space-y-6"
        @submit="onSubmit"
      >
        <BaseInput name="email" type="email" :label="t('forms.fields.identifier')" autocomplete="email" is-required />
        <BaseInput name="password" type="password" :label="t('forms.fields.password')" autocomplete="current-password" is-required />
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me" name="remember-me" type="checkbox"
              class="h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-100">{{ t('auth.login.remember_me') }}</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-turquoise-50 hover:text-turquoise-300">{{ t('auth.login.forgot_password') }}</a>
          </div>
        </div>
        <BaseErrorMessage :errors="submissionErrors" />
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-turquoise-600 hover:bg-turquoise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500"
          >
            {{ t('actions.validate') }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { InferType, TestContext } from 'yup'
import { object, string } from 'yup'

type LoginForm = InferType<typeof schema>
interface ILoginResponse {
  id: number
  user: number
  token: string
  refreshToken: string
  expiresAt: string
}

const { t } = useI18n()
const { apiGet, apiPost, setApiAuthToken } = useApi()
const authCookie = useCookie('us-auth', { sameSite: 'lax' })

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
  resetState: resetErrors,
} = useFormSubmission(submit)

async function submit(form: LoginForm) {
  resetErrors()
  const { data: { token, user } } = await apiPost<ILoginResponse>('/auth/login', form[0])
  authCookie.value = token
  setApiAuthToken(token)

  const loggedInUser = await apiGet<Models.User>(`/users/${user}`)
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
