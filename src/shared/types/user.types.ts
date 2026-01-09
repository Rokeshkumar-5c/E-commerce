export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  membership: string;
  avatar: string;
}

export interface UserAddress {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  holder: string;
  expires: string;
}

export interface Order {
  id: string;
  date: string;
  total: string;
  status: 'Shipped' | 'Delivered' | 'Pending' | 'Cancelled';
  items: string[];
}

export interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  orders: Order[];
  wishlist: string[];
  addresses: UserAddress[];
  paymentMethods: PaymentMethod[];
}
