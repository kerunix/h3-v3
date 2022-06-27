export default function useFormSubmission(submit: (args: any) => Promise<void>) {
  const submissionErrors = ref<string[]>([])

  const isSubmitting = ref(false)

  const isSuccess = ref(false)

  function resetErrors() {
    submissionErrors.value = []
  }

  function resetState() {
    submissionErrors.value = []
    isSuccess.value = false
    isSubmitting.value = false
  }

  async function onSubmit(...args: any[]) {
    isSubmitting.value = true
    resetErrors()
    try {
      await submit(args)
      isSuccess.value = true
    }
    catch (error: any) {
      if (error?.response) {
        submissionErrors.value.push(error.response.data.message)
        return
      }

      submissionErrors.value.push(error.message)
    }
    finally {
      isSubmitting.value = false
    }
  }

  return {
    submissionErrors,
    onSubmit,
    isSuccess,
    isSubmitting,
    resetState,
  }
}