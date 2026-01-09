# Architecture & Code Quality Recommendations

## Executive Summary

This document outlines recommendations to transform the current e-commerce application into a production-ready, scalable, and maintainable codebase following corporate standards.

---

## 1. Project Structure & Organization

### Current Issues
- Flat component structure
- No clear separation of concerns
- Types scattered across files
- No feature-based organization

### Recommended Structure

```
src/
├── app/                    # App-level configuration
│   ├── router/
│   │   ├── routes.tsx
│   │   └── routeConfig.ts
│   ├── providers/
│   │   ├── ReduxProvider.tsx
│   │   └── ThemeProvider.tsx
│   └── App.tsx
│
├── features/               # Feature-based modules (RECOMMENDED)
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   ├── cart/
│   ├── checkout/
│   ├── user/
│   └── home/
│
├── shared/                 # Shared across features
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base components (Button, Input, etc.)
│   │   ├── layout/        # Layout components
│   │   └── common/        # Common components
│   ├── hooks/             # Shared hooks
│   ├── utils/             # Utility functions
│   ├── types/             # Shared TypeScript types
│   ├── constants/         # Constants
│   └── lib/               # Third-party integrations
│
├── store/                 # Redux store
│   ├── slices/
│   ├── middleware/
│   └── store.ts
│
└── assets/                # Static assets
```

**Benefits:**
- Clear feature boundaries
- Easier to locate code
- Better scalability
- Team collaboration friendly

---

## 2. Type Safety & TypeScript Best Practices

### Current Issues
- Types defined in component files
- No shared type definitions
- Missing strict TypeScript config

### Recommendations

#### 2.1 Create Shared Types Directory

```typescript
// src/shared/types/index.ts
export * from './product.types';
export * from './cart.types';
export * from './user.types';
export * from './common.types';

// src/shared/types/product.types.ts
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

export interface ProductFinish {
  name: string;
  color: string;
}

export type ProductCategory = 
  | 'Desk Accessories'
  | 'Decor'
  | 'Electronics'
  | 'Stationery'
  | 'Decorative Statues';
```

#### 2.2 Enable Strict TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## 3. Component Architecture

### Current Issues
- Components doing too much (business logic + UI)
- No separation of presentational vs container components
- Inline styles mixed with Tailwind

### Recommendations

#### 3.1 Component Categories

**Base UI Components** (`shared/components/ui/`)
- Button, Input, Card, Badge, etc.
- Pure presentational, no business logic
- Highly reusable

**Feature Components** (`features/*/components/`)
- ProductCard, CartItem, etc.
- Feature-specific, can have business logic

**Layout Components** (`shared/components/layout/`)
- Header, Footer, Sidebar
- App-level layout

#### 3.2 Example: Refactored ProductCard

```typescript
// features/products/components/ProductCard/ProductCard.tsx
import { ProductCardProps } from '../types';
import { ProductCardContainer } from './ProductCard.styles';
import { ProductImage } from './ProductImage';
import { ProductCardActions } from './ProductCardActions';
import { ProductCardInfo } from './ProductCardInfo';
import { useProductCard } from '../hooks/useProductCard';

export const ProductCard = ({ product }: ProductCardProps) => {
  const { handleAddToCart, handleToggleWishlist } = useProductCard(product);

  return (
    <ProductCardContainer to={`/product/${product.id}`}>
      <ProductImage image={product.image} alt={product.name} />
      <ProductCardActions
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />
      <ProductCardInfo product={product} />
    </ProductCardContainer>
  );
};
```

---

## 4. State Management Improvements

### Current Issues
- Selectors not memoized
- No middleware for side effects
- State structure could be optimized

### Recommendations

#### 4.1 Add Redux Middleware

```typescript
// store/middleware/localStorage.ts
import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Persist cart to localStorage
  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  }
  
  return result;
};
```

#### 4.2 Memoized Selectors with Reselect

```typescript
// store/slices/cart/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

const selectCartItems = (state: RootState) => state.cart.items;

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

export const selectCartItemsWithDetails = createSelector(
  [selectCartItems, (state: RootState) => state.products.items],
  (cartItems, products) => {
    return cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      return { ...cartItem, product };
    });
  }
);
```

#### 4.3 Async Actions with createAsyncThunk

```typescript
// store/slices/products/productsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../../services/productsApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    return await productsApi.getProducts(category);
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
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

---

## 5. Custom Hooks Pattern

### Current Issues
- Business logic mixed in components
- No reusable hooks
- Duplicate logic across components

### Recommendations

```typescript
// features/products/hooks/useProduct.ts
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/slices/cart/cartSlice';
import { selectProductById } from '../../../store/slices/products/selectors';

export const useProduct = (productId: string) => {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(productId));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }));
    }
  };

  return {
    product,
    handleAddToCart,
  };
};

// features/cart/hooks/useCart.ts
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

  return {
    items,
    total,
    itemCount,
    handleUpdateQuantity,
    handleRemoveItem,
  };
};
```

---

## 6. API Layer & Services

### Current Issues
- No API abstraction
- Hardcoded data in slices
- No error handling

### Recommendations

```typescript
// shared/services/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

// features/products/services/productsApi.ts
import { apiClient } from '../../../shared/services/api/client';
import type { Product } from '../../../shared/types';

export const productsApi = {
  getProducts: async (category?: string): Promise<Product[]> => {
    const params = category ? { category } : {};
    const { data } = await apiClient.get('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const { data } = await apiClient.get('/products/search', {
      params: { q: query },
    });
    return data;
  },
};
```

---

## 7. Error Handling & Loading States

### Current Issues
- No error boundaries
- Inconsistent loading states
- No error messages to users

### Recommendations

```typescript
// shared/components/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Send to error tracking service
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// shared/components/Loading/LoadingSpinner.tsx
export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`} />
  );
};
```

---

## 8. Testing Strategy

### Recommendations

```typescript
// Example: Component Testing
// features/products/components/ProductCard/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { mockProduct } from '../../../../shared/test-utils/mocks';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const handleAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);
    // Test implementation
  });
});

// Example: Hook Testing
// features/cart/hooks/useCart.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';

describe('useCart', () => {
  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    // Test implementation
  });
});
```

**Testing Stack:**
- Vitest (unit tests)
- React Testing Library (component tests)
- MSW (API mocking)
- Playwright (E2E tests)

---

## 9. Performance Optimizations

### Recommendations

#### 9.1 Code Splitting

```typescript
// app/router/routes.tsx
import { lazy } from 'react';

const HomePage = lazy(() => import('../../features/home/pages/HomePage'));
const ProductListingPage = lazy(() => import('../../features/products/pages/ProductListingPage'));
const ProductDetailPage = lazy(() => import('../../features/products/pages/ProductDetailPage'));
const ShoppingCartPage = lazy(() => import('../../features/cart/pages/ShoppingCartPage'));
const CheckoutPage = lazy(() => import('../../features/checkout/pages/CheckoutPage'));
const UserAccountPage = lazy(() => import('../../features/user/pages/UserAccountPage'));

// Wrap with Suspense in router
```

#### 9.2 React.memo for Expensive Components

```typescript
// features/products/components/ProductCard/ProductCard.tsx
export const ProductCard = React.memo<ProductCardProps>(({ product }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});
```

#### 9.3 Image Optimization

```typescript
// shared/components/Image/OptimizedImage.tsx
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export const OptimizedImage = ({ src, alt, className, fallback }: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (fallback) setImageSrc(fallback);
          setIsLoading(false);
        }}
        className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}
      />
    </div>
  );
};
```

---

## 10. Environment Configuration

### Recommendations

```typescript
// shared/config/env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// .env.example
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_ANALYTICS_ID=G-...
```

---

## 11. Styling Architecture

### Current State
- Mix of Tailwind and styled-components
- Inconsistent patterns

### Recommendations

**Use Tailwind for:**
- Layout (flex, grid, spacing)
- Typography
- Colors
- Responsive design
- Utility classes

**Use styled-components for:**
- Dynamic props (background-image, dynamic colors)
- Complex component-specific styles
- Theme integration
- CSS-in-JS animations

**Example Pattern:**

```typescript
// ✅ Good: Tailwind for layout, styled-components for dynamic
const ProductCard = styled(Link)`
  @apply flex flex-col bg-white rounded-xl border overflow-hidden;
  /* styled-components for dynamic styles */
  background-color: ${props => props.$variant === 'featured' ? 'var(--primary)' : 'white'};
`;

// ❌ Bad: Using @apply for everything
const ProductCard = styled(Link)`
  @apply flex flex-col bg-white rounded-xl border overflow-hidden;
`;
```

---

## 12. Documentation Standards

### Recommendations

```typescript
/**
 * ProductCard Component
 * 
 * Displays a product card with image, name, price, and actions.
 * 
 * @example
 * ```tsx
 * <ProductCard 
 *   product={product}
 *   onAddToCart={handleAddToCart}
 * />
 * ```
 * 
 * @param {ProductCardProps} props - Component props
 * @returns {JSX.Element} Product card component
 */
export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Implementation
};
```

---

## 13. Git Workflow & Branching Strategy

### Recommendations

**Branch Naming:**
- `feature/product-search`
- `bugfix/cart-calculation`
- `hotfix/payment-error`
- `refactor/product-card`

**Commit Messages:**
```
feat(products): add product search functionality
fix(cart): correct total calculation for discounted items
refactor(components): extract ProductCard into smaller components
docs(readme): update installation instructions
```

---

## 14. CI/CD Pipeline

### Recommendations

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

---

## 15. Accessibility (a11y)

### Recommendations

```typescript
// shared/components/Button/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled,
  'aria-label': ariaLabel,
  ...props 
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## Implementation Priority

### Phase 1 (Critical - Week 1-2)
1. ✅ Restructure to feature-based architecture
2. ✅ Add TypeScript strict mode
3. ✅ Create shared types
4. ✅ Add error boundaries
5. ✅ Implement API layer

### Phase 2 (Important - Week 3-4)
6. ✅ Add custom hooks
7. ✅ Implement memoized selectors
8. ✅ Add loading states
9. ✅ Code splitting
10. ✅ Testing setup

### Phase 3 (Enhancement - Week 5+)
11. ✅ Performance optimizations
12. ✅ Accessibility improvements
13. ✅ Documentation
14. ✅ CI/CD pipeline

---

## Conclusion

Following these recommendations will result in:
- ✅ **Scalability**: Feature-based architecture supports growth
- ✅ **Maintainability**: Clear structure and separation of concerns
- ✅ **Type Safety**: Comprehensive TypeScript usage
- ✅ **Performance**: Optimized rendering and code splitting
- ✅ **Developer Experience**: Better tooling and patterns
- ✅ **Corporate Standards**: Industry best practices
