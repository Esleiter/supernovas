import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  //   user?: any;
  token?: boolean;
}

const initialState = {
  token: false,
} as AuthState;

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogout: () => initialState,
    setToken: (state, action: PayloadAction<boolean>) => {
      state.token = action.payload;
    },
  },
});

export const {
    setLogout,
    setToken
  } = authSlice.actions
  export default authSlice.reducer