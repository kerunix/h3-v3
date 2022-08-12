interface DomainPostPayload extends Models.Domain {
  // TODO: Define POST request type
}

interface DomainPatchPayload extends Models.Domain {
  // TODO: Define PATCH request type
}

export const useDomainsApi = () => {
  const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

  const BASE_URL = '/domains'

  function getAll() {
    return apiGet<Models.Domain[]>(BASE_URL)
  }

  function getOne(id: number | string) {
    return apiGet<Models.Domain>(BASE_URL, { params: { id } })
  }

  function deleteOne(id: number | string) {
    return apiDelete<Models.Domain>(BASE_URL, { params: { id } })
  }

  function postOne(payload: DomainPostPayload) {
    return apiPost<Models.Domain>(BASE_URL, payload)
  }

  function patchOne(id: number | string, payload: DomainPatchPayload) {
    return apiPatch<Models.Domain>(BASE_URL, payload, { params: { id } })
  }

  return {
    getAll,
    getOne,
    deleteOne,
    postOne,
    patchOne,
  }
}
