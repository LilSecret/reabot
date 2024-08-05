import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/app.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createRef, FormEvent, useEffect, useState } from "react";
import BotMessagesWrapper from "./components/Message/BotMessagesWrapper";
import Message from "./components/Message/Message";
import { TMessage } from "./types";
import toast from "react-hot-toast";
import ReabotBtn from "./components/Reabot/ReabotBtn";
import askOpenAI from "./OpenAPI";

function App() {
  const [reabotActive, setReabotActive] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const endOfChatRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  const isInputValueError = inputValue.length < 5 && formIsSubmitted;

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormIsSubmitted(true);

    if (isInputValueError) {
      toast.error("Your message is to short");
      return;
    }

    setMessages((prevItems) => [
      ...prevItems,
      { type: "User", content: inputValue },
    ]);

    setInputValue("");

    askOpenAI(inputValue).then((response) => {
      if (typeof response !== "string") {
        throw new Error("response is not a string");
      }

      setMessages((prevItems) => [
        ...prevItems,
        { type: "Bot", content: response },
      ]);
    });
  };

  useEffect(() => {
    setMessages([
      { type: "Bot", content: "Hello I'm ReaBot. How may I assist You?" },
    ]);
  }, []);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, endOfChatRef]);

  return (
    <>
      <div
        className={`reabot-container ${reabotActive ? "active" : ""}`}
        id="reabot-window"
      >
        <header className="reabot-header">
          <div className="header-reabot-profile">
            <img
              className="header-img"
              src="/reabot-profile.png"
              alt="reabot profile"
            />
          </div>
          <h3 className="header-title">ReaBot</h3>
        </header>
        <div className="reabot-content">
          {messages.map((message, index) => {
            return message.type === "Bot" ? (
              <BotMessagesWrapper key={index}>
                <Message type={message.type}>{message.content}</Message>
              </BotMessagesWrapper>
            ) : (
              <Message key={index} type={message.type}>
                {message.content}
              </Message>
            );
          })}
          <div className="end-of-chat" ref={endOfChatRef}>
            End of Chat
          </div>
        </div>
        <form
          className="reabot-form"
          onSubmit={handleForm}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <input
            ref={inputRef}
            className="user-input"
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Enter your message"
            value={inputValue}
            data-error={isInputValueError}
          />
          <button className="reabot-form-btn" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>

      <ReabotBtn
        reabotActive={reabotActive}
        setReabotActive={setReabotActive}
      />
    </>
  );
}

export default App;
