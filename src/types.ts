export type TMessageType = "Bot" | "User";

export type TMessage = {
  type: TMessageType;
  content: string;
};
