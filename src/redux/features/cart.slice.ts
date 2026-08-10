import { createSlice } from "@reduxjs/toolkit";

export interface Shipment {
  serviceId: string;
  shipment_charge_total: number;
}

export interface CartGroupItem {
  shipment: Shipment | null;
  cartGroupId: string;
}

export interface CartState {
  carts: CartGroupItem[]
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addShipmentToCart: (state, action: { payload: { cartGroupId: string; shipment: Shipment } }) => {
      const { cartGroupId, shipment } = action.payload;
      const existingCart = state.carts.find(cart => cart.cartGroupId === cartGroupId);

      if (existingCart) {
        existingCart.shipment = shipment;
      } else {
        state.carts.push({ cartGroupId, shipment });
      }
    },

    clearCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});




export const { clearCart, addShipmentToCart } = cartSlice.actions;

export default cartSlice.reducer;