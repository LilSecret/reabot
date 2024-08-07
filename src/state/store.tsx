import { configureStore } from "@reduxjs/toolkit";
import reabotReducer from "./reabot/reabotSlice";
import reabotFormReducer from "./reabot/reabotFormSlice";
import userInfoReducer from "./user/userSlice";
import { Store } from "redux";

export const store: Store = configureStore({
  reducer: {
    reabot: reabotReducer,
    reabotForm: reabotFormReducer,
    userInfo: userInfoReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
