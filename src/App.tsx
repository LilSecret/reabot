import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/app.css";
import { faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";

function App() {
  const [reabotActive, setReabotActive] = useState(false);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
            voluptates, necessitatibus neque sequi fuga odit, a veniam id
            provident beatae unde nihil vel voluptatum optio quis. Consequuntur
            quos quisquam fugiat nulla dignissimos. Repellat tempora expedita
            voluptas saepe ipsam vel amet!
          </p>
        </div>
        <form className="reabot-form" onSubmit={handleForm}>
          <input type="text" placeholder="Enter your message" />
          <button className="reabot-form-btn" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>

      <button
        className={`reabot-btn ${reabotActive ? "active" : ""}`}
        onClick={() => {
          setReabotActive((prevState) => {
            return prevState ? false : true;
          });
        }}
      >
        <FontAwesomeIcon className="exit-icon" icon={faX} />
        <img
          className="assistant-icon-btn"
          src="/reabot-profile.png"
          alt="reabot profile"
        />
      </button>
    </>
  );
}

export default App;
