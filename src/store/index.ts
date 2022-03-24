import { configureStore } from "@reduxjs/toolkit";
import { base } from "services/base";
import { authSlice } from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    api: base.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(base.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch