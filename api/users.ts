interface UserPostPayload extends Models.User { }

const { apiDelete, apiGet, apiPost, apiPatch } = useApi()

const BASE_URL = '/users'

export function getOne(id: number | string) {
  return apiGet<Models.User>(BASE_URL, { params: { id } })
}

export function deleteOne(id: number | string) {
  return apiDelete<Models.User>(BASE_URL, { params: { id } })
}

export function postOne(payload: UserPostPayload) {
  return apiPost<Models.User>(BASE_URL, payload)
}

export function patchOne(id: number | string, payload: UserPostPayload) {
  return apiPatch<Models.User>(BASE_URL, payload, { params: { id } })
}
