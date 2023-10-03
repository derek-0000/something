"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
export interface User {
  userId: string;
  type: string;
  token: string;
  salon_id: string;
}

const initialState: User = {
  userId: "",
  type: "",
  token: "",
  salon_id: "",
};

export const userSesionSlice = createSlice({
  name: "userSesion",
  initialState,
  reducers: {
    setUserSesion: (state, action: PayloadAction<User>) => {
      const user: User = action.payload;
      state = user;
      localStorage.setItem("token", user.token);
      localStorage.setItem("salon_id", user.salon_id);
      localStorage.setItem("user_id", user.userId);
      user.salon_id
        ? localStorage.setItem("salon_id", user.salon_id.toString())
        : null;
    },
  },
});

export const { setUserSesion } = userSesionSlice.actions;

export default userSesionSlice.reducer;
