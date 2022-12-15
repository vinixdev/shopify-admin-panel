export interface ShipmentResponse {
  shipments: ShipmentInterface[];
  perPage: number;
  totalShipments: number;
}

export interface ShipmentInterface {
  id: string;
  employee: userInfoShipment;
  order: object;
  selectedDateTime: string;
  deliveredAt: string;
  note: string;
  status: number;
}

export interface userInfoShipment {
  first_name: string;
  last_name: string;
  email: string;
}
