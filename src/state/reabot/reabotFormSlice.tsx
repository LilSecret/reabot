import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFormRequest } from "../../types";

export type ReabotFormState = {
  isFormSubmitted: boolean;
  reabotUserInput: string;
  reabotRequest: TFormRequest;
};

const initialState: ReabotFormState = {
  isFormSubmitted: false,
  reabotUserInput: "",
  reabotRequest: "SetPersonalInfo",
};

const reabotFormSlice = createSlice({
  name: "reabot-form",
  initialState,
  reducers: {
    toggleIsFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
    changeReabotRequest: (state, action: PayloadAction<TFormRequest>) => {
      state.reabotRequest = action.payload;
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.reabotUserInput = action.payload;
    },
  },
});

export const { toggleIsFormSubmitted, changeReabotRequest, setUserInput } =
  reabotFormSlice.actions;

export default reabotFormSlice.reducer;
