import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAdmin: boolean;
}

const initialState: AuthState = {
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAdmin = true;
    },
    logout: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
