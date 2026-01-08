import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membership: string;
  avatar: string;
}

interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholder: string;
}

interface UserState {
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@example.com',
    phone: '+1 (555) 123-4567',
    membership: 'Gold Member',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApiIdia871HIetL9pMcR77z1IUX7waSC6G05kwl6B4gG1jK7NSlpJYF0lXGbuaNgiMdgcCnwDqRdxFGuOAF82exL1Se0U2i0JerVXIt8BnXnGRR9A5zzyI5_yM2JZNBF64uJZIfp2W_Qo8LTKD05YoOukWWAERf-RAe2y7kBBoleLXpC3riwooVx6R8hsMYL6jG6lgazQD_ASDqDwNRRCqB7S9KRdZZQ2f7HG2Xwq5y8DkZjmBYT075ecauunAdXys4tOv0toQaIU',
  },
  addresses: [
    {
      id: '1',
      type: 'Home',
      name: 'Alex Johnson',
      street: '123 Maple Avenue, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'VISA',
      last4: '4288',
      expiryMonth: '12',
      expiryYear: '25',
      cardholder: 'Alex Johnson',
    },
  ],
  isAuthenticated: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updatePassword: (state) => {
      // Password update logic would go here
      // For now, just acknowledge the action
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { updateProfile, updatePassword, addAddress, updateAddress, addPaymentMethod, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectAddresses = (state: RootState) => state.user.addresses;
export const selectPaymentMethods = (state: RootState) => state.user.paymentMethods;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;
