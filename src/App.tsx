import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/app.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createRef, FormEvent, useEffect } from "react";
import BotMessagesWrapper from "./components/Message/BotMessagesWrapper";
import Message from "./components/Message/Message";
import { RootState } from "./types";
import toast from "react-hot-toast";
import ReabotBtn from "./components/Reabot/ReabotBtn";
import { LLM, LLMProperty } from "./llm";
import ReabotLoading from "./components/Reabot/ReabotLoading";
import { isEmailValid } from "./validations";
import OtherTopics from "./components/Reabot/OtherTopics";
import { useDispatch, useSelector } from "react-redux";
import {
  changeReabotRequest,
  setUserInput,
  toggleIsFormSubmitted,
} from "./state/reabot/reabotFormSlice";
import {
  addMessage,
  toggleIsOtherTopicsVisible,
  toggleReabotLoading,
} from "./state/reabot/reabotSlice";
import { setUserInfo } from "./state/user/userSlice";

function App() {
  const { reabotUserInput, isFormSubmitted, reabotRequest } = useSelector(
    (state: RootState) => state.reabotForm
  );
  const { messages, isReabotLoading, isOtherTopicsVisible, isReabotActive } =
    useSelector((state: RootState) => state.reabot);
  const { user } = useSelector((state: RootState) => state.userInfo);

  const dispatch = useDispatch();

  const endOfChatRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  const isInputValueError = reabotUserInput.length < 5 && isFormSubmitted;

  const handleLLMRequest = (property: LLMProperty) => {
    return LLM[property](reabotUserInput).then((response) => {
      if (typeof response !== "string") {
        throw new Error("response is not a string");
      }

      dispatch(addMessage({ type: "Bot", content: response }));
    });
  };

  const handleSetInfo = () => {
    const messageLength = messages.length;

    if (messageLength === 1) {
      dispatch(setUserInfo({ name: reabotUserInput }));
      dispatch(
        addMessage({
          type: "Bot",
          content: `What is your email address?`,
        })
      );
    } else if (messageLength === 2 || typeof user?.email === "undefined") {
      if (typeof user?.name !== "string") {
        throw new Error("user name is not set");
      }

      const validEmail = isEmailValid(reabotUserInput);

      if (!validEmail) {
        dispatch(
          addMessage({
            type: "Bot",
            content: "That is an invalid Email. Please try again.",
          })
        );
      }

      if (validEmail) {
        dispatch(
          addMessage({
            type: "Bot",
            content: `Thank You ${user.name}! What brings you here?`,
          })
        );

        dispatch(setUserInfo({ name: user.name, email: reabotUserInput }));
        dispatch(changeReabotRequest("Chat"));
        dispatch(toggleIsOtherTopicsVisible(true));
      }
    }
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInputValueError) {
      toast.error("Your message is to short");
      return;
    }

    dispatch(toggleIsFormSubmitted(true));

    dispatch(addMessage({ type: "User", content: reabotUserInput }));

    switch (reabotRequest) {
      case "SetPersonalInfo":
        handleSetInfo();
        break;
      case "AreaPOI":
        dispatch(toggleReabotLoading(true));
        handleLLMRequest("parsePropertyPOI").finally(() => {
          dispatch(toggleReabotLoading(false));
        });
        break;
      case "Chat":
        dispatch(toggleReabotLoading(true));
        handleLLMRequest("askOpenAI").finally(() => {
          dispatch(toggleReabotLoading(false));
        });
        break;
      case "Joke":
        dispatch(toggleReabotLoading(true));
        handleLLMRequest("askComedyJoke").finally(() => {
          dispatch(toggleReabotLoading(false));
        });
        break;
      case "PropertyLookup":
        dispatch(toggleReabotLoading(true));
        handleLLMRequest("parsePropertyDetails").finally(() => {
          dispatch(toggleReabotLoading(false));
        });
        break;

      default:
        throw new Error("form request in invalid");
    }
    dispatch(setUserInput(""));
  };

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, endOfChatRef]);

  return (
    <>
      <div
        className={`reabot-container ${isReabotActive ? "active" : ""}`}
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
          {isOtherTopicsVisible && <OtherTopics />}
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
              dispatch(setUserInput(e.target.value));
            }}
            placeholder="Enter your message"
            value={reabotUserInput}
            data-error={isInputValueError}
          />
          <button className="reabot-form-btn" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>

      <ReabotBtn />
    </>
  );
}

export default App;
