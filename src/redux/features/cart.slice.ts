import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartCharity {
  id: string,
  name: string,
  donationPercent: number,
  donationAmount: number
}

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  charities: CartCharity[],
  donation_percent: number,
  extra_donation: number,
  total_donation: number
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const recalculate = (items: CartItem[]) => ({
  totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity + item.extra_donation,
    0
  ),
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      const { totalQuantity, totalPrice } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);

      const { totalQuantity, totalPrice } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // min 1
      }

      const { totalQuantity, totalPrice } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
export const selectIsInCart = (productId: string) => (state: { cart: CartState }) =>
  state.cart.items.some((item) => item.id === productId);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;