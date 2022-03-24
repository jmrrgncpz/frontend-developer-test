import { IFetchDevicesQueryResult } from "models/devices";
import { base } from "./base";

const deviceApi = base.injectEndpoints({
  endpoints: (builder) => ({
    fetchDevices: builder.query<IFetchDevicesQueryResult, void>({
      query: () => '/devices',
    })
  })
})

export const { useFetchDevicesQuery } = deviceApi;