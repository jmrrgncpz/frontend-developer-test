import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authApi } from "services/auth";

const store = configureStore({
  reducer: {
    api: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()