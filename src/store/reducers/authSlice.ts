import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from 'store';

interface IAuthSliceState {
  token: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null
  },
  reducers: {
    setToken(state: IAuthSliceState, action: PayloadAction<string>) {
      const token = action.payload;

      localStorage.setItem('token', token);
      state.token = token;
    },
    clearToken(state: IAuthSliceState) {
      localStorage.removeItem('token');
      state.token = null;
    },
  }
})

export const tokenSelector = createSelector((state: RootState) => state.auth, (auth) => auth.token)
export const { setToken, clearToken } = authSlice.actions;