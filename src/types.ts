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
  | "Parser";

export type TMessage = {
  type: TMessageType;
  content: string;
};
