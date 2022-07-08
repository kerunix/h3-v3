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
      if (error.data?.message) {
        console.error(error.data)
        submissionErrors.value.push(error.data.message)
        return
      }
      console.error(error)
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
