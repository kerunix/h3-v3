interface ProviderPostPayload extends Models.Provider { }

const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

const BASE_URL = '/providers'

export function getOne(id: number | string) {
  return apiGet<Models.Provider>(BASE_URL, { params: { id } })
}

export function deleteOne(id: number | string) {
  return apiDelete<Models.Provider>(BASE_URL, { params: { id } })
}

export function postOne(payload: ProviderPostPayload) {
  return apiPost<Models.Provider>(BASE_URL, payload)
}

export function patchOne(id: number | string, payload: ProviderPostPayload) {
  return apiPatch<Models.Provider>(BASE_URL, payload, { params: { id } })
}
