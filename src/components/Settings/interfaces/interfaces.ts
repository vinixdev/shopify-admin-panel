export interface SettingResponseInterface {
  settings: ISetting[];
  perPage: number;
  totalSettings: number;
}

export interface ISetting {
  id: string;
  key: string;
  value: string;
  scope: number;
  version: string;
}
