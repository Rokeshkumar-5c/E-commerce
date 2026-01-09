import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { CartItem } from '../shared/types';
import { InFlightStatuses, CartInFlightNames, type InFlightStatus } from '../shared/types/inFlight.types';

interface ExtendedCartState {
  items: CartItem[];
  inFlights: {
    [CartInFlightNames.addToCartInFlight]: InFlightStatus;
    [CartInFlightNames.removeFromCartInFlight]: InFlightStatus;
    [CartInFlightNames.updateQuantityInFlight]: InFlightStatus;
    [CartInFlightNames.clearCartInFlight]: InFlightStatus;
  };
}

const initialState: ExtendedCartState = {
  items: [],
  inFlights: {
    [CartInFlightNames.addToCartInFlight]: { status: InFlightStatuses.INITIAL },
    [CartInFlightNames.removeFromCartInFlight]: { status: InFlightStatuses.INITIAL },
    [CartInFlightNames.updateQuantityInFlight]: { status: InFlightStatuses.INITIAL },
    [CartInFlightNames.clearCartInFlight]: { status: InFlightStatuses.INITIAL },
  },
};

// Async thunks for cart operations (simulating API calls)
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item: Omit<CartItem, 'quantity'>, { dispatch }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch(addToCart(item));
    return item.id;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (id: string, { dispatch }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    dispatch(removeFromCart(id));
    return id;
  }
);

export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantityAsync',
  async ({ id, quantity }: { id: string; quantity: number }, { dispatch }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    dispatch(updateQuantity({ id, quantity }));
    return { id, quantity };
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { dispatch }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    dispatch(clearCart());
  }
);

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
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCartAsync.pending, (state) => {
        state.inFlights[CartInFlightNames.addToCartInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        state.inFlights[CartInFlightNames.addToCartInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.inFlights[CartInFlightNames.addToCartInFlight].status = InFlightStatuses.ERROR;
      })
      // Remove from Cart
      .addCase(removeFromCartAsync.pending, (state) => {
        state.inFlights[CartInFlightNames.removeFromCartInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(removeFromCartAsync.fulfilled, (state) => {
        state.inFlights[CartInFlightNames.removeFromCartInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(removeFromCartAsync.rejected, (state) => {
        state.inFlights[CartInFlightNames.removeFromCartInFlight].status = InFlightStatuses.ERROR;
      })
      // Update Quantity
      .addCase(updateQuantityAsync.pending, (state) => {
        state.inFlights[CartInFlightNames.updateQuantityInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(updateQuantityAsync.fulfilled, (state) => {
        state.inFlights[CartInFlightNames.updateQuantityInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(updateQuantityAsync.rejected, (state) => {
        state.inFlights[CartInFlightNames.updateQuantityInFlight].status = InFlightStatuses.ERROR;
      })
      // Clear Cart
      .addCase(clearCartAsync.pending, (state) => {
        state.inFlights[CartInFlightNames.clearCartInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.inFlights[CartInFlightNames.clearCartInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(clearCartAsync.rejected, (state) => {
        state.inFlights[CartInFlightNames.clearCartInFlight].status = InFlightStatuses.ERROR;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => {
  return state.cart.items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0);
};
export const selectCartItemCount = (state: RootState) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

// InFlight Selectors
export const selectIsAddingToCart = (state: RootState) =>
  state.cart.inFlights[CartInFlightNames.addToCartInFlight].status === InFlightStatuses.PENDING;

export const selectIsRemovingFromCart = (state: RootState) =>
  state.cart.inFlights[CartInFlightNames.removeFromCartInFlight].status === InFlightStatuses.PENDING;

export const selectIsUpdatingQuantity = (state: RootState) =>
  state.cart.inFlights[CartInFlightNames.updateQuantityInFlight].status === InFlightStatuses.PENDING;

export const selectIsClearingCart = (state: RootState) =>
  state.cart.inFlights[CartInFlightNames.clearCartInFlight].status === InFlightStatuses.PENDING;

export const selectCartInFlightStatus = (state: RootState, inFlightName: CartInFlightNames) =>
  state.cart.inFlights[inFlightName].status;

export const selectIsAnyCartOperationInFlight = (state: RootState) => {
  const inFlights = state.cart.inFlights;
  return (
    inFlights[CartInFlightNames.addToCartInFlight].status === InFlightStatuses.PENDING ||
    inFlights[CartInFlightNames.removeFromCartInFlight].status === InFlightStatuses.PENDING ||
    inFlights[CartInFlightNames.updateQuantityInFlight].status === InFlightStatuses.PENDING ||
    inFlights[CartInFlightNames.clearCartInFlight].status === InFlightStatuses.PENDING
  );
};

export default cartSlice.reducer;
