import { configureStore } from "@reduxjs/toolkit";
import { customerAPI } from "./api/customerApi";

export const store = configureStore({
  reducer: { 

    [customerAPI.reducerPath]: customerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      customerAPI.middleware,
    ),
});