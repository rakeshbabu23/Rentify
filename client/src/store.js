import { configureStore } from "@reduxjs/toolkit";
import registerSliceReducer from "./features/registerSlice";
import sellerSliceReducer from "./features/seller/sellerSlice";
import buyerSliceReducer from "./features/buyer/buyerSlice";
const store = configureStore({
  reducer: {
    register: registerSliceReducer,
    seller: sellerSliceReducer,
    buyer: buyerSliceReducer,
  },
});

export default store;
