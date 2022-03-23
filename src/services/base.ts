import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const base = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
  }),
  endpoints: () => ({})
})