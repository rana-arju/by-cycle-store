import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  images: string; 
}
type IProductState = {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
};
const initialState: IProductState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICartItem>) => {
      const { product, price, quantity } = action.payload;
      if (!state.items) {
        state.items = [];
      }
      const existingItem = state.items.find((item) => item.product === product);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === id);
      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addCart, clearCart, updateQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
