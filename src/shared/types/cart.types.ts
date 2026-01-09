export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category?: string;
  description?: string;
  selectedFinish?: {
    name: string;
    color: string;
  };
}

export interface CartState {
  items: CartItem[];
}
