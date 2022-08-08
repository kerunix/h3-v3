interface ProviderPostPayload extends Models.Provider {
  // TODO: Define POST request type
}

interface ProviderPatchPayload extends Models.Provider {
  // TODO: Define PATCH request type
}
export default function useProviders() {
  const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

  const BASE_URL = '/providers'

  function getOne(id: number | string) {
    return apiGet<Models.Provider>(BASE_URL, { params: { id } })
  }

  function deleteOne(id: number | string) {
    return apiDelete<Models.Provider>(BASE_URL, { params: { id } })
  }

  function postOne(payload: ProviderPostPayload) {
    return apiPost<Models.Provider>(BASE_URL, payload)
  }

  function patchOne(id: number | string, payload: ProviderPatchPayload) {
    return apiPatch<Models.Provider>(BASE_URL, payload, { params: { id } })
  }

  return {
    getOne,
    deleteOne,
    postOne,
    patchOne,
  }
}
