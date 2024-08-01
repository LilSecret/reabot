import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/app.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useEffect, useState } from "react";
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

    const message = (await askOpenAI(inputValue)) as string;

    setMessages((prevItems) => [
      ...prevItems,
      { type: "Bot", content: message },
    ]);

    setInputValue("");
  };

  useEffect(() => {
    setMessages([
      { type: "Bot", content: "Hello I'm ReaBot. How may I assist You?" },
    ]);
  }, []);

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
          {messages.map((message) => {
            return message.type === "Bot" ? (
              <BotMessagesWrapper>
                <Message type={message.type}>{message.content}</Message>
              </BotMessagesWrapper>
            ) : (
              <Message type={message.type}>{message.content}</Message>
            );
          })}
        </div>
        <form className="reabot-form" onSubmit={handleForm}>
          <input
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
