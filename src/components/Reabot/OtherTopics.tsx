import { useDispatch } from "react-redux";
import {
  changeReabotRequest,
  setUserInput,
} from "../../state/reabot/reabotFormSlice";
import {
  addMessage,
  toggleIsOtherTopicsVisible,
} from "../../state/reabot/reabotSlice";
import { setUserLookupAction } from "../../state/user/userSlice";

function OtherTopics() {
  const dispatch = useDispatch();

  return (
    <div className="other-topics">
      <p className="topic-span">Suggested</p>
      <button
        className="topic"
        onClick={() => {
          dispatch(
            addMessage({
              type: "Bot",
              content:
                "What is the street address? Example: '4529 Winona Court'",
            })
          );
          dispatch(setUserLookupAction("AreaPOI"));
          dispatch(changeReabotRequest("SetLocation"));
          dispatch(toggleIsOtherTopicsVisible(false));
        }}
      >
        Look up a property's near by points of interests
      </button>
      <button
        className="topic"
        onClick={() => {
          dispatch(
            addMessage({
              type: "Bot",
              content: "What is the street address? Example: 4529 Winona Court",
            })
          );
          dispatch(setUserLookupAction("PropertyLookup"));
          dispatch(changeReabotRequest("SetLocation"));
          dispatch(toggleIsOtherTopicsVisible(false));
        }}
      >
        Look up a property's Information
      </button>
      <button
        className="topic"
        onClick={() => {
          dispatch(changeReabotRequest("Joke"));
          dispatch(addMessage({ type: "Bot", content: "Give me a word." }));
          dispatch(setUserInput(""));
          dispatch(toggleIsOtherTopicsVisible(false));
        }}
      >
        Tell me a joke
      </button>
    </div>
  );
}

export default OtherTopics;
