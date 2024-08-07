import { ReabotFormState } from "./state/reabot/reabotFormSlice";
import { ReabotState } from "./state/reabot/reabotSlice";
import { UserInfoState } from "./state/user/userSlice";

export type TMessageType = "Bot" | "User";

export type TAddress = {
  address1: string;
  address2: string;
};

export type TUserInfo = {
  name: string;
  email?: string;
};

export type addressLookups = TAddress[];

export type TFormRequest =
  | "SetPersonalInfo"
  | "PropertyLookup"
  | "AreaPOI"
  | "Chat"
  | "Joke"
  | "SetLocation";

export type TMessage = {
  type: TMessageType;
  content: string;
};

export type RootState = {
  reabot: ReabotState;
  reabotForm: ReabotFormState;
  userInfo: UserInfoState;
};
