import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "../../types";

export type ReabotState = {
  isReabotActive: boolean;
  messages: TMessage[];
  isReabotLoading: boolean;
  isOtherTopicsVisible: boolean;
};

const initialState: ReabotState = {
  isReabotActive: false,
  messages: [
    {
      type: "Bot",
      content: "Hello I'm ReaBot your AI Assistant. Please provide your name?",
    },
  ],
  isReabotLoading: false,
  isOtherTopicsVisible: false,
};

const reabotSlice = createSlice({
  name: "reabot",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<TMessage>) => {
      state.messages = [...state.messages, action.payload];
    },
    toggleReabotLoading: (state, action: PayloadAction<boolean>) => {
      state.isReabotLoading = action.payload;
    },
    toggleIsReabotActive: (state, action: PayloadAction<boolean>) => {
      state.isReabotActive = action.payload;
    },
    toggleIsOtherTopicsVisible: (state, action: PayloadAction<boolean>) => {
      state.isOtherTopicsVisible = action.payload;
    },
  },
});

export const {
  addMessage,
  toggleReabotLoading,
  toggleIsReabotActive,
  toggleIsOtherTopicsVisible,
} = reabotSlice.actions;

export default reabotSlice.reducer;
