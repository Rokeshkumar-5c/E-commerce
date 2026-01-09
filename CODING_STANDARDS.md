# Coding Standards & Best Practices

Quick reference guide for maintaining code quality and consistency.

## Table of Contents
1. [File Naming Conventions](#file-naming-conventions)
2. [Component Structure](#component-structure)
3. [TypeScript Guidelines](#typescript-guidelines)
4. [Styling Guidelines](#styling-guidelines)
5. [State Management](#state-management)
6. [Testing Standards](#testing-standards)
7. [Code Review Checklist](#code-review-checklist)

---

## File Naming Conventions

### Components
- **PascalCase** for component files: `ProductCard.tsx`
- **camelCase** for utility files: `formatPrice.ts`
- **kebab-case** for config files: `vite.config.ts`

### Directories
- **camelCase** for feature directories: `productCard/`
- **PascalCase** for component directories: `ProductCard/`

### Examples
```
✅ Good:
features/products/components/ProductCard/ProductCard.tsx
features/products/hooks/useProduct.ts
shared/utils/formatPrice.ts

❌ Bad:
features/products/components/product-card.tsx
features/products/hooks/UseProduct.ts
shared/utils/FormatPrice.ts
```

---

## Component Structure

### Standard Component Template

```typescript
// 1. Imports (grouped)
// External libraries
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal imports
import { Button } from '../../../shared/components/ui/Button';
import { useProduct } from '../../hooks/useProduct';
import type { ProductCardProps } from './ProductCard.types';

// Styles
import { ProductCardContainer } from './ProductCard.styles';

// 2. Types/Interfaces
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

// 3. Component
export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Hooks
  const dispatch = useDispatch();
  const { handleAddToCart } = useProduct(product);

  // Event handlers
  const handleClick = () => {
    handleAddToCart();
    onAddToCart?.(product);
  };

  // Render
  return (
    <ProductCardContainer>
      {/* JSX */}
    </ProductCardContainer>
  );
};

// 4. Exports
export default ProductCard;
```

### Component Organization Order
1. External imports
2. Internal imports (features, shared)
3. Type imports
4. Style imports
5. Types/Interfaces
6. Component
7. Exports

---

## TypeScript Guidelines

### ✅ DO

```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
}

// Use type for unions, intersections, primitives
type Status = 'idle' | 'loading' | 'success' | 'error';
type UserWithRole = User & { role: string };

// Use const assertions for constants
const STATUSES = ['idle', 'loading', 'success'] as const;
type Status = typeof STATUSES[number];

// Use generic types for reusable logic
function useApi<T>(url: string): [T | null, boolean, Error | null] {
  // Implementation
}

// Use utility types
type PartialProduct = Partial<Product>;
type ProductId = Pick<Product, 'id'>;
type ProductWithoutPrice = Omit<Product, 'price'>;
```

### ❌ DON'T

```typescript
// Don't use 'any'
function processData(data: any) { } // ❌

// Don't use type assertions unnecessarily
const value = data as string; // ❌

// Don't ignore TypeScript errors
// @ts-ignore
const result = someFunction(); // ❌
```

---

## Styling Guidelines

### Tailwind Usage

**✅ Use Tailwind for:**
- Layout (flex, grid, spacing)
- Typography
- Colors
- Responsive design
- Common utilities

```typescript
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
```

### Styled Components Usage

**✅ Use styled-components for:**
- Dynamic props
- Complex component-specific styles
- Theme integration

```typescript
const ProductImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

### ❌ Avoid

```typescript
// Don't mix @apply with styled-components
const BadComponent = styled.div`
  @apply flex flex-col; // ❌
`;

// Don't use inline styles
<div style={{ color: 'red' }}> // ❌

// Use className instead
<div className="text-red-500"> // ✅
```

---

## State Management

### Redux Patterns

**✅ DO:**

```typescript
// Use createSelector for memoization
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Use createAsyncThunk for async operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    return await productsApi.getProducts(category);
  }
);

// Use typed hooks
const dispatch = useDispatch<AppDispatch>();
const cartItems = useSelector(selectCartItems);
```

**❌ DON'T:**

```typescript
// Don't mutate state directly
state.items.push(newItem); // ❌

// Don't create selectors without memoization
export const selectCartTotal = (state: RootState) => {
  return state.cart.items.reduce(...); // ❌ Not memoized
};
```

### Custom Hooks Pattern

```typescript
// ✅ Good: Encapsulate logic in hooks
export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  
  const handleAddItem = useCallback((item: CartItem) => {
    dispatch(addToCart(item));
  }, [dispatch]);
  
  return {
    items,
    handleAddItem,
  };
};

// ❌ Bad: Logic in component
const Component = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  
  const handleAddItem = (item: CartItem) => {
    dispatch(addToCart(item)); // Logic in component
  };
};
```

---

## Testing Standards

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const handleAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart', () => {
  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.handleAddItem(mockItem);
    });
    
    expect(result.current.items).toContainEqual(mockItem);
  });
});
```

---

## Code Review Checklist

### Functionality
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is implemented
- [ ] Loading states are shown

### Code Quality
- [ ] Follows naming conventions
- [ ] No console.logs or debug code
- [ ] No commented-out code
- [ ] Functions are small and focused
- [ ] DRY principle followed

### TypeScript
- [ ] All types are defined
- [ ] No `any` types
- [ ] Proper use of interfaces vs types
- [ ] Generic types used where appropriate

### Performance
- [ ] Memoization used where needed
- [ ] No unnecessary re-renders
- [ ] Large lists are virtualized
- [ ] Images are optimized

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

### Testing
- [ ] Unit tests written
- [ ] Tests pass
- [ ] Edge cases tested
- [ ] Coverage is adequate

### Documentation
- [ ] Complex logic is commented
- [ ] Component props documented
- [ ] README updated if needed

---

## Common Patterns

### Error Handling

```typescript
// ✅ Good: Error boundary + try/catch
try {
  const result = await apiCall();
  return result;
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch data');
  }
  throw error;
}
```

### Loading States

```typescript
// ✅ Good: Loading component
const { data, isLoading, error } = useQuery('products', fetchProducts);

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <ProductList products={data} />;
```

### Form Handling

```typescript
// ✅ Good: Controlled components with validation
const [formData, setFormData] = useState({ email: '' });
const [errors, setErrors] = useState({ email: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  // Clear error on change
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

---

## Quick Reference

### Import Order
1. React/External libraries
2. Internal features
3. Shared components/utils
4. Types
5. Styles
6. Relative imports

### Naming Conventions
- **Components**: PascalCase (`ProductCard`)
- **Hooks**: camelCase starting with `use` (`useProduct`)
- **Functions**: camelCase (`formatPrice`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`Product`, `UserProfile`)

### File Structure
```
ComponentName/
  ├── ComponentName.tsx      # Main component
  ├── ComponentName.styles.ts # Styled components
  ├── ComponentName.types.ts  # TypeScript types
  ├── ComponentName.test.tsx  # Tests
  └── index.ts                # Exports
```

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Testing Library](https://testing-library.com/)
