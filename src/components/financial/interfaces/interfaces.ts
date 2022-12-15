export interface PaymentResponseInterface {
  payments: PaymentInterface[];
  perPage: number;
  totalPayments: number;
}

export interface CouponResponseInterface {
  coupons: CouponInterface[];
  perPage: number;
  totalCoupons: number;
}

export interface CouponInterface {
  id: string;
  code: string;
  amount: number;
  limit: number;
  expires_at: string;
  status: number;
}

export interface PaymentInterface {
  id: string;
  amount: number;
  createdAt: string;
  method: string;
  order: object;
  reference: string;
  reserve: string;
  status: number;
  updatedAt: string;
  user: UserInterface;
}

export interface UserInterface {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
}

export interface ProductInterface {
  id: string;
  title: string;
}

export interface CategoryInterface {
  id: string;
  title: string;
}

export interface QualificationItemInterface {
  id: string;
}

export interface QualificationInterface {
  users: string[];
  products: string[];
  categories: string[];
}
