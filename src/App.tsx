import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/app.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createRef, FormEvent, useEffect, useState } from "react";
import BotMessagesWrapper from "./components/Message/BotMessagesWrapper";
import Message from "./components/Message/Message";
import { TFormRequest, TMessage, TUserInfo } from "./types";
import toast from "react-hot-toast";
import ReabotBtn from "./components/Reabot/ReabotBtn";
import { LLM, LLMProperty } from "./llm";
import ReabotLoading from "./components/Reabot/ReabotLoading";
import { isEmailValid } from "./validations";
import OtherTopics from "./components/Reabot/OtherTopics";

function App() {
  const [user, setUser] = useState<TUserInfo | null>();
  const [reabotActive, setReabotActive] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isReabotLoading, setIsReabotLoading] = useState(false);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [visibleOtherTopics, setVisibleOtherTopics] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [formRequest, setFormRequest] =
    useState<TFormRequest>("PropertyLookup");

  const endOfChatRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  const isInputValueError = inputValue.length < 5 && formIsSubmitted;

  const handleLLMRequest = (property: LLMProperty) => {
    return LLM[property](inputValue).then((response) => {
      if (typeof response !== "string") {
        throw new Error("response is not a string");
      }

      setMessages((prevItems) => [
        ...prevItems,
        { type: "Bot", content: response },
      ]);
    });
  };

  const handleSetInfo = () => {
    const messageLength = messages.length;

    if (messageLength === 1) {
      setUser({ email: undefined, name: inputValue });
      setMessages((preValues) => {
        return [
          ...preValues,
          {
            type: "Bot",
            content: "Thank you! What is your email address?",
          },
        ];
      });
    } else if (messageLength === 2 || typeof user?.email === "undefined") {
      if (typeof user?.name !== "string") {
        throw new Error("user name is not set");
      }

      const validEmail = isEmailValid(inputValue);

      if (!validEmail) {
        setMessages((preValues) => {
          return [
            ...preValues,
            {
              type: "Bot",
              content: "That is an invalid Email. Please try again.",
            },
          ];
        });
      }

      if (validEmail) {
        setMessages((preValues) => {
          return [
            ...preValues,
            {
              type: "Bot",
              content: `Thank You ${user.name}! What brings you here?`,
            },
          ];
        });

        setUser({ name: user.name, email: inputValue });
        setFormRequest("Chat");
      }
    }
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInputValueError) {
      toast.error("Your message is to short");
      return;
    }

    setFormIsSubmitted(true);

    setMessages((prevItems) => [
      ...prevItems,
      { type: "User", content: inputValue },
    ]);

    switch (formRequest) {
      case "SetPersonalInfo":
        handleSetInfo();
        break;
      case "AreaPOI":
        setIsReabotLoading(true);
        handleLLMRequest("parsePropertyPOI").finally(() => {
          setIsReabotLoading(false);
        });
        break;
      case "Chat":
        setIsReabotLoading(true);
        handleLLMRequest("askOpenAI").finally(() => {
          setIsReabotLoading(false);
        });
        break;
      case "Joke":
        setIsReabotLoading(true);
        handleLLMRequest("askComedyJoke").finally(() => {
          setIsReabotLoading(false);
        });
        break;
      case "PropertyLookup":
        setIsReabotLoading(true);
        handleLLMRequest("parsePropertyDetails").finally(() => {
          setIsReabotLoading(false);
        });
        break;

      default:
        throw new Error("form request in invalid");
    }
    setInputValue("");
  };

  useEffect(() => {
    setMessages([
      {
        type: "Bot",
        content:
          "Hello I'm ReaBot your AI Assistant. Please provide your name?",
      },
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
          <div className="chat-logs">
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
          </div>
          {visibleOtherTopics && <OtherTopics />}
          <div className="end-of-chat" ref={endOfChatRef}>
            End of Chat
          </div>
          {isReabotLoading && <ReabotLoading />}
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
