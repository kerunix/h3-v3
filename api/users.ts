interface UserPostPayload extends Models.User {
  // TODO: Define POST request type
}

interface UserPatchPayload extends Models.User {
  // TODO: Define PATCH request type
}

const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

const BASE_URL = '/providers'

export const UsersApi = {
  getOne: (id: number | string) => {
    return apiGet<Models.User>(BASE_URL, { params: { id } })
  },

  deleteOne: (id: number | string) => {
    return apiDelete<Models.User>(BASE_URL, { params: { id } })
  },

  postOne: (payload: UserPostPayload) => {
    return apiPost<Models.User>(BASE_URL, payload)
  },

  patchOne: (id: number | string, payload: UserPatchPayload) => {
    return apiPatch<Models.User>(BASE_URL, payload, { params: { id } })
  },
}
