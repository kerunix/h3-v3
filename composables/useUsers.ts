interface UserPostPayload extends Models.User {
  // TODO: Define POST request type
}

interface UserPatchPayload extends Models.User {
  // TODO: Define PATCH request type
}

const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

const BASE_URL = '/users'

export default function useUsers() {
  function getOne(id: number | string) {
    return apiGet<Models.User>(BASE_URL, { params: { id } })
  }

  function deleteOne(id: number | string) {
    return apiDelete<Models.User>(BASE_URL, { params: { id } })
  }

  function postOne(payload: UserPostPayload) {
    return apiPost<Models.User>(BASE_URL, payload)
  }

  function patchOne(id: number | string, payload: UserPatchPayload) {
    return apiPatch<Models.User>(BASE_URL, payload, { params: { id } })
  }

  return {
    getOne,
    deleteOne,
    postOne,
    patchOne,
  }
}
