export interface ProductFinish {
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  category: string;
  collection?: string;
  description?: string;
  images?: string[];
  sku?: string;
  stock?: number;
  finishes?: ProductFinish[];
  details?: string;
  specifications?: string;
  shippingReturns?: string;
}

export type ProductCategory =
  | 'Desk Accessories'
  | 'Decor'
  | 'Electronics'
  | 'Stationery'
  | 'Decorative Statues';

export type ProductStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
