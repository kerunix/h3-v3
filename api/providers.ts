interface ProviderPostPayload extends Models.Provider { }

const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

export function getOne(id: number | string) {
  return apiGet<Models.Provider>('/providers', { params: { id } })
}

export function deleteOne(id: number | string) {
  return apiDelete<Models.Provider>('/providers', { params: { id } })
}

export function postOne(payload: ProviderPostPayload) {
  return apiPost<Models.Provider>('/providers', payload)
}

export function patchOne(id: number | string, payload: ProviderPostPayload) {
  return apiPatch<Models.Provider>('/providers', payload, { params: { id } })
}
