import { IAuthenticateMutationParams } from "models/auth"
import { base } from "./base"

export const authApi = base.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, IAuthenticateMutationParams>({
      query: (params) => ({
        url: 'login',
        method: 'POST',
        body: params,
        responseHandler: (response) => response.text()
      })
    })
  })
})

export const { useLoginMutation } = authApi