import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReabotBtn({
  reabotActive,
  setReabotActive,
}: {
  reabotActive: boolean;
  setReabotActive: (bool: boolean) => void;
}) {
  return (
    <button
      className={`reabot-btn ${reabotActive ? "active" : ""}`}
      onClick={() => {
        setReabotActive(reabotActive ? false : true);
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
