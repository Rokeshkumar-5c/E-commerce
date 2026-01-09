# InFlight Pattern Implementation

## Overview

Successfully implemented the inFlight pattern for tracking async operations in Redux slices, following corporate standards.

## Implementation Details

### 1. Created InFlight Types

**File:** `src/shared/types/inFlight.types.ts`

- `InFlightStatuses` enum: `INITIAL`, `PENDING`, `SUCCESS`, `ERROR`
- `ProductsInFlightNames` enum: Names for product-related async operations
- `CartInFlightNames` enum: Names for cart-related async operations
- `InFlightStatus` interface: Status object structure

### 2. Updated Products Slice

**File:** `src/store/productsSlice.ts`

**Changes:**
- Added `inFlights` object to `ProductsState`
- Tracked `fetchProductsInFlight` and `fetchProductByIdInFlight`
- Updated async thunk handlers to set inFlight statuses
- Created selectors:
  - `selectIsFetchingProducts()`
  - `selectIsFetchingProductById()`
  - `selectProductsInFlightStatus()`

**Example:**
```typescript
inFlights: {
  [ProductsInFlightNames.fetchProductsInFlight]: { status: InFlightStatuses.INITIAL },
  [ProductsInFlightNames.fetchProductByIdInFlight]: { status: InFlightStatuses.INITIAL },
}
```

### 3. Updated Cart Slice

**File:** `src/store/cartSlice.ts`

**Changes:**
- Created async thunks: `addToCartAsync`, `removeFromCartAsync`, `updateQuantityAsync`, `clearCartAsync`
- Added `inFlights` object to track all cart operations
- Updated extraReducers to handle inFlight statuses
- Created selectors:
  - `selectIsAddingToCart()`
  - `selectIsRemovingFromCart()`
  - `selectIsUpdatingQuantity()`
  - `selectIsClearingCart()`
  - `selectIsAnyCartOperationInFlight()`

**Example:**
```typescript
inFlights: {
  [CartInFlightNames.addToCartInFlight]: { status: InFlightStatuses.INITIAL },
  [CartInFlightNames.removeFromCartInFlight]: { status: InFlightStatuses.INITIAL },
  [CartInFlightNames.updateQuantityInFlight]: { status: InFlightStatuses.INITIAL },
  [CartInFlightNames.clearCartInFlight]: { status: InFlightStatuses.INITIAL },
}
```

### 4. Updated Components to Use InFlight Statuses

#### ProductCard Component
- Uses `selectIsAddingToCart` to show loading spinner
- Disables button during add to cart operation
- Shows loading state in button

#### ShoppingCartPage
- Uses `selectIsUpdatingQuantity` for quantity controls
- Shows loading spinners on quantity buttons during updates
- Disables inputs during operations

#### ProductInfo Component
- Uses `selectIsAddingToCart` for add to cart button
- Shows loading state with spinner

#### ProductDetailPage
- Uses `selectIsFetchingProductById` to show loading state
- Fetches product on mount if not in store

#### ProductListingPage
- Uses `selectIsFetchingProducts` to show loading state
- Fetches products by category on mount

#### CheckoutPage
- Uses `selectIsClearingCart` for payment button
- Shows loading state during cart clearing

### 5. Created Typed Dispatch Hook

**File:** `src/shared/hooks/useAppDispatch.ts`

- Typed wrapper around `useDispatch` for better TypeScript support
- Ensures async thunks are properly typed

## Usage Examples

### In Components

```typescript
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../shared/hooks/useAppDispatch';
import { addToCartAsync, selectIsAddingToCart } from '../store/cartSlice';
import { LoadingSpinner } from '../shared/components/Loading';

const Component = () => {
  const dispatch = useAppDispatch();
  const isAddingToCart = useSelector(selectIsAddingToCart);

  const handleAddToCart = () => {
    dispatch(addToCartAsync({ id, name, price, image }));
  };

  return (
    <button onClick={handleAddToCart} disabled={isAddingToCart}>
      {isAddingToCart ? (
        <LoadingSpinner size="sm" />
      ) : (
        'Add to Cart'
      )}
    </button>
  );
};
```

### Checking Multiple InFlight Statuses

```typescript
const isAnyOperationInFlight = useSelector(selectIsAnyCartOperationInFlight);

if (isAnyOperationInFlight) {
  // Show global loading indicator
}
```

## Benefits

1. **Consistent Loading States**: All async operations tracked uniformly
2. **Better UX**: Users see loading indicators for all operations
3. **Type Safety**: Fully typed with TypeScript
4. **Scalable**: Easy to add new async operations
5. **Corporate Standard**: Follows industry best practices

## Files Modified

### Slices
- `src/store/productsSlice.ts` - Added inFlights tracking
- `src/store/cartSlice.ts` - Added async thunks and inFlights tracking

### Components
- `src/components/ProductCard.tsx` - Uses inFlight for add to cart
- `src/components/ProductInfo.tsx` - Uses inFlight for add to cart
- `src/pages/ShoppingCartPage.tsx` - Uses inFlight for cart operations
- `src/pages/ProductDetailPage.tsx` - Uses inFlight for product fetching
- `src/pages/ProductListingPage.tsx` - Uses inFlight for products fetching
- `src/pages/CheckoutPage.tsx` - Uses inFlight for cart clearing

### New Files
- `src/shared/types/inFlight.types.ts` - InFlight type definitions
- `src/shared/hooks/useAppDispatch.ts` - Typed dispatch hook

## Status

✅ All inFlight patterns implemented
✅ Components updated to use loading states
✅ TypeScript errors resolved
✅ Loading spinners integrated
✅ Button disabled states added
