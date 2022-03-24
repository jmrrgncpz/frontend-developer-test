import { INotifyRequestParams } from 'models/notification';
import { base } from "./base";

export const notificationApi = base.injectEndpoints({
  endpoints: (builder) => ({
    notify: builder.mutation<string, INotifyRequestParams>({
      query: (data) => ({
        url: '/notify',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data,
        responseHandler: (response) => response.text()
      })
    })
  })
})

export const { useNotifyMutation } = notificationApi;