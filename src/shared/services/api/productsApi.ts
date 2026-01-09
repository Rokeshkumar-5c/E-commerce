import { apiClient } from './client';
import type { Product, ProductCategory } from '../../types';

/**
 * Products API Service
 * Handles all product-related API calls
 */
export const productsApi = {
  /**
   * Fetch all products, optionally filtered by category
   */
  getProducts: async (category?: ProductCategory): Promise<Product[]> => {
    const params = category ? { category } : {};
    const { data } = await apiClient.get<Product[]>('/products', { params });
    return data;
  },

  /**
   * Fetch a single product by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  /**
   * Search products by query string
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/products/search', {
      params: { q: query },
    });
    return data;
  },
};
