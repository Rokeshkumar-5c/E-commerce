# Refactoring Examples

This document shows concrete examples of how to refactor existing code following the recommended architecture.

## Example 1: Feature-Based Structure - Products Feature

### Current Structure
```
components/
  ProductCard.tsx
  ProductInfo.tsx
  ImageGallery.tsx
```

### Recommended Structure
```
features/products/
  ├── components/
  │   ├── ProductCard/
  │   │   ├── ProductCard.tsx
  │   │   ├── ProductCard.styles.ts
  │   │   ├── ProductCard.test.tsx
  │   │   └── index.ts
  │   ├── ProductInfo/
  │   └── ImageGallery/
  ├── hooks/
  │   ├── useProduct.ts
  │   └── useProducts.ts
  ├── services/
  │   └── productsApi.ts
  ├── types/
  │   └── product.types.ts
  └── index.ts
```

## Example 2: Refactored ProductCard Component

### Before (Current)
```typescript
// components/ProductCard.tsx
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';

export interface Product {
  id: string;
  name: string;
  price: string;
  // ... many fields
}

const ProductImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  .group:hover & {
    transform: scale(1.05);
  }
`;

const ProductCard = ({ id, name, price, rating, image }: Product) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id, name, price, image }));
  };

  return (
    <Link to={`/product/${id}`} className="group flex flex-col bg-white...">
      <div className="relative aspect-square overflow-hidden...">
        <ProductImage $imageUrl={image} />
        {/* ... rest of component */}
      </div>
    </Link>
  );
};
```

### After (Refactored)
```typescript
// features/products/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  category: string;
  // ... other fields
}

// features/products/hooks/useProductCard.ts
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../features/cart/store/cartSlice';
import type { Product } from '../types/product.types';

export const useProductCard = (product: Product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));
  }, [dispatch, product]);

  const handleNavigateToProduct = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return {
    handleAddToCart,
    handleNavigateToProduct,
  };
};

// features/products/components/ProductCard/ProductCard.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductCardContainer = styled(Link)`
  @apply group flex flex-col bg-white dark:bg-[#1a2230] rounded-xl border border-[#dbdfe6] dark:border-white/5 overflow-hidden hover:shadow-xl transition-all duration-300;
`;

export const ProductImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  .group:hover & {
    transform: scale(1.05);
  }
`;

// features/products/components/ProductCard/ProductCard.tsx
import { ProductCardContainer, ProductImage } from './ProductCard.styles';
import { useProductCard } from '../../hooks/useProductCard';
import type { Product } from '../../types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { handleAddToCart, handleNavigateToProduct } = useProductCard(product);

  return (
    <ProductCardContainer to={`/product/${product.id}`}>
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <ProductImage $imageUrl={product.image} />
        {/* Actions */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
        <div className="absolute bottom-3 right-3">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/90"
            aria-label="Add to cart"
          >
            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-[#111318] dark:text-white text-lg truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">{product.price}</span>
          <div className="flex items-center gap-0.5 text-yellow-400 text-sm">
            <span className="material-symbols-outlined text-[16px] fill-current">star</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </ProductCardContainer>
  );
};

// features/products/components/ProductCard/index.ts
export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';
```

## Example 3: Refactored Cart Slice with Memoized Selectors

### Before
```typescript
// store/cartSlice.ts
export const selectCartTotal = (state: RootState) => {
  return state.cart.items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0);
};
```

### After
```typescript
// features/cart/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// features/cart/store/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

const selectCartState = (state: RootState) => state.cart;
const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartItemsWithProductDetails = createSelector(
  [selectCartItems, (state: RootState) => state.products.items],
  (cartItems, products) => {
    return cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      return {
        ...cartItem,
        product,
      };
    });
  }
);
```

## Example 4: Custom Hook Pattern

### Before (Logic in Component)
```typescript
// pages/ShoppingCartPage.tsx
const ShoppingCartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
  
  // ... rest of component
};
```

### After (Logic in Hook)
```typescript
// features/cart/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  updateQuantity,
  removeFromCart,
  addToCart,
} from '../store/cartSlice';
import type { CartItem } from '../types/cart.types';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleAddItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch(addToCart(item));
  };

  return {
    items,
    total,
    itemCount,
    handleUpdateQuantity,
    handleRemoveItem,
    handleAddItem,
  };
};

// features/cart/pages/ShoppingCartPage.tsx
import { useCart } from '../hooks/useCart';

const ShoppingCartPage: React.FC = () => {
  const {
    items,
    total,
    itemCount,
    handleUpdateQuantity,
    handleRemoveItem,
  } = useCart();

  // Component focuses only on rendering
  return (
    <main>
      {/* JSX */}
    </main>
  );
};
```

## Example 5: API Service Layer

### Before (Hardcoded Data)
```typescript
// store/productsSlice.ts
const initialState: ProductsState = {
  items: [
    {
      id: "1",
      name: "Marble Desk Set",
      // ... hardcoded data
    },
  ],
};
```

### After (API Service)
```typescript
// shared/services/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

// features/products/services/productsApi.ts
import { apiClient } from '../../../shared/services/api/client';
import type { Product } from '../types/product.types';

export const productsApi = {
  getProducts: async (category?: string): Promise<Product[]> => {
    const params = category ? { category } : {};
    const { data } = await apiClient.get<Product[]>('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },
};

// features/products/store/productsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import type { Product } from '../types/product.types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    return await productsApi.getProducts(category);
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    return await productsApi.getProductById(id);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});
```

## Example 6: Shared UI Components

```typescript
// shared/components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 animate-spin">⏳</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

## Summary

Key improvements:
1. ✅ **Separation of Concerns**: Logic in hooks, styles in separate files
2. ✅ **Reusability**: Shared components and hooks
3. ✅ **Type Safety**: Centralized types
4. ✅ **Performance**: Memoized selectors
5. ✅ **Maintainability**: Clear structure and organization
6. ✅ **Testability**: Isolated units easy to test
