import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

export interface AuthState {
  user?: UserCredential;
  token?: string;
}

const initialState = {
  token: '',
} as AuthState;

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogout: () => initialState,
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<UserCredential>) => {
      state.user = action.payload
    }
  },
});

export const {
    setLogout,
    setToken,
    setUser
  } = authSlice.actions
  export default authSlice.reducer