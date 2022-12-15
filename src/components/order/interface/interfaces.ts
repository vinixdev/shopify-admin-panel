export interface AllOrderInterface {
  id: string;
  user: userOrderInterface;
  total_price: number;
  final_price: number;
  status: number;
  created_at: string;
  updated_at: string;
  address: AddressInterface;
  order_items: OrderItemsInterface[];
}

interface userOrderInterface {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface OrdersResponseInterface {
  orders: AllOrderInterface[];
  totalOrders: number;
  perPage: number;
}

interface AddressInterface {
  address: string;
  city: string;
  full_name: string;
  mobile: string;
  state: string;
  title: string;
  zip_code: string;
  _id: string;
}

interface OrderItemsInterface {
  count: number;
  createdAt: string;
  price: number;
  specialPrice: number;
  product: ProductItemInterface;
  _id: string;
}

interface ProductItemInterface {
  price: number;
  thumbnailUrl: string;
  title: string;
  id: string;
}
