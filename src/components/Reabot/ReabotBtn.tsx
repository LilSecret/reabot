import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";
import { toggleIsReabotActive } from "../../state/reabot/reabotSlice";

function ReabotBtn() {
  const { isReabotActive } = useSelector((state: RootState) => state.reabot);
  const dispatch = useDispatch();

  return (
    <button
      className={`reabot-btn ${isReabotActive ? "active" : ""}`}
      onClick={() => {
        dispatch(toggleIsReabotActive(isReabotActive ? false : true));
      }}
    >
      <FontAwesomeIcon className="exit-icon" icon={faX} />
      <img
        className="assistant-icon-btn"
        src="/reabot-profile.png"
        alt="reabot profile"
      />
    </button>
  );
}

export default ReabotBtn;
