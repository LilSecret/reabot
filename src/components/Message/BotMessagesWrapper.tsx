import { ReactNode } from "react";

function BotMessagesWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <img
        className="message-wrapper-img"
        src="/reabot-profile.png"
        alt="ReaBot profile"
      />
      {children}
      {/* <Message type="User" children="I am doing wonderful" /> */}
    </>
  );
}

export default BotMessagesWrapper;
