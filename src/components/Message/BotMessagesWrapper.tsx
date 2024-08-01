import Message from "./Message";

function BotMessagesWrapper() {
  return (
    <>
      <img
        className="message-wrapper-img"
        src="/reabot-profile.png"
        alt="ReaBot profile"
      />
      <Message
        type="Bot"
        children="Hello there! I'm ReaBot. How are you doing Kevin?"
      />
      {/* <Message type="User" children="I am doing wonderful" /> */}
    </>
  );
}

export default BotMessagesWrapper;
