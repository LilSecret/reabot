import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAddress, TFormRequest, TUserInfo } from "../../types";

export type UserInfoState = {
  user: TUserInfo | null;
  userLocation: Partial<TAddress> | null;
  userLookupAction: TFormRequest | null;
};

const initialState: UserInfoState = {
  user: null,
  userLocation: null,
  userLookupAction: null,
};

const userInfoSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<TUserInfo>) => {
      state.user = action.payload;
    },
    setUserLocation: (
      state,
      action: PayloadAction<Partial<TAddress> | null>
    ) => {
      state.userLocation = action.payload;
    },
    setUserLookupAction: (
      state,
      action: PayloadAction<TFormRequest | null>
    ) => {
      state.userLookupAction = action.payload;
    },
  },
});

export const { setUserInfo, setUserLocation, setUserLookupAction } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
