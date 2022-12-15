export interface CustomerResponseInterface {
  users: CustomerInterface[];
  perPage: number;
  totalUsers: number;
}

export interface CustomerInterface {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  total_order: number;
  wallet: number;
  email: string;
  addresses: IAddress[];
  created_at: string;
}

export interface IAddress {
  title: string;
  city: string;
  state: string;
  address: string;
  zip_code?: string;
  full_name: string;
  mobile: string;
}
