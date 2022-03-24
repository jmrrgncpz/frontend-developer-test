export interface IFetchDevicesQueryResult {
  devices: IDevice[]
}

export interface IDevice {
  id: number;
  name: string;
}