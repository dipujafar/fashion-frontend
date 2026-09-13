import { createSlice } from "@reduxjs/toolkit";

export interface Shipment {
  serviceId: string;
  shipment_charge_total: number;
}

export interface CartGroupItem {
  shipment: Shipment | null;
  cartGroupId: string;
  treeCount : number;
  treeCostTotal : number;
  allowedAuthentication : boolean;
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
        state.carts.push({ cartGroupId, shipment, treeCount: 0, treeCostTotal: 0, allowedAuthentication: false});
      }
    },

    addTreeCountToCart: (state, action: { payload: { cartGroupId: string; treeCount: number; treeCostTotal: number } }) => {

      const { cartGroupId, treeCount, treeCostTotal } = action.payload;

      const existingCart = state.carts.find(cart => cart.cartGroupId === cartGroupId);

      if (existingCart) {
        existingCart.treeCount = treeCount;
        existingCart.treeCostTotal = treeCostTotal;
      } else {
        state.carts.push({ cartGroupId, shipment: null, treeCount, treeCostTotal, allowedAuthentication: false });
      }
    },

    toggleAuthenticationToCart: (state, action: { payload: { cartGroupId: string; allowedAuthentication: boolean } }) => {

      const { cartGroupId, allowedAuthentication } = action.payload;

      const existingCart = state.carts.find(cart => cart.cartGroupId === cartGroupId);
      if (existingCart) {
        existingCart.allowedAuthentication = allowedAuthentication;
      }else {
        state.carts.push({ cartGroupId, shipment: null, treeCount: 0, treeCostTotal: 0, allowedAuthentication });
      }
    },

    clearCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});





export const { clearCart, addShipmentToCart, addTreeCountToCart, toggleAuthenticationToCart } = cartSlice.actions;

export default cartSlice.reducer;