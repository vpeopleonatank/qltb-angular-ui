export interface DeviceListConfig {
  type: string;

  filters: {
    limit?: number;
    offset?: number;
  };
}
