import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types";

export type UserInfoState = {
  user: TUserInfo | null;
};

const initialState: UserInfoState = {
  user: null,
};

const userInfoSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<TUserInfo>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
