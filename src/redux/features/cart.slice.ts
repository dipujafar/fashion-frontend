import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartCharity {
  id: string;
  name: string;
  donationPercent: number;
  donationAmount: number;
}

export interface CartItem {
  id: string;
  product: IProduct;
  price: number;
  quantity: number;
  charities: CartCharity[];
  donation_percent: number;
  extra_donation: number;
  total_donation: number;
  shipping_fee: number;
  total_price: number;
}

export interface GiftTree {
  tree_count: number,
  gift_amount: number
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  sub_totalPrice: number;
  totalPrice: number;
  total_extraDonation: number;
  total_shippingFee: number;
  tree_gift: GiftTree
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  sub_totalPrice: 0,
  totalPrice: 0,
  total_extraDonation: 0,
  total_shippingFee: 0,
  tree_gift: {
    tree_count: 0,
    gift_amount: 0
  }
};

// item.price * qty (no extras)
const recalculateItemPrice = (item: CartItem): number => item.price * item.quantity + item.extra_donation + item.shipping_fee;

// Recalculate all cart-level totals
const recalculate = (items: CartItem[], total_gift: number) => {
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const sub_totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total_extraDonation = items.reduce((sum, i) => sum + i.extra_donation, 0);
  const total_shippingFee = items.reduce((sum, i) => sum + i.shipping_fee, 0);
  const totalPrice = sub_totalPrice + total_extraDonation + total_shippingFee + total_gift;

  return { totalQuantity, sub_totalPrice, totalPrice, total_extraDonation, total_shippingFee };
};

// Apply recalculate result to state
const applyRecalculate = (state: CartState) => {
  const result = recalculate(state.items, state?.tree_gift?.gift_amount);
  state.totalQuantity = result.totalQuantity;
  state.sub_totalPrice = result.sub_totalPrice;
  state.totalPrice = result.totalPrice;
  state.total_extraDonation = result.total_extraDonation;
  state.total_shippingFee = result.total_shippingFee;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.total_price = recalculateItemPrice(existing);
      } else {
        state.items.push({
          ...action.payload,
          total_price: recalculateItemPrice(action.payload),
        });
      }

      applyRecalculate(state);
    },
    addToGiftTree: (state, action: PayloadAction<GiftTree>) => {
      state.tree_gift = action?.payload;
      applyRecalculate(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      applyRecalculate(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        item.total_price = recalculateItemPrice(item);
      }

      applyRecalculate(state);
    },

    clearCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectFullCart = (state: { cart: CartState }) => state.cart;
export const selectIsInCart = (productId: string) => (state: { cart: CartState }) =>
  state.cart.items.some((item) => item.id === productId);

export const selectTotalSummary = (state: { cart: CartState }) => ({
  subtotal: state.cart.sub_totalPrice,
  totalExtraDonation: state.cart.total_extraDonation,
  totalShipping: state.cart.total_shippingFee,
  grandTotal: state.cart.totalPrice,
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, addToGiftTree } = cartSlice.actions;

export default cartSlice.reducer;