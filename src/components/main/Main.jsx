import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import authService from "../../authService";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (promptText) => {
    setInput(promptText);
    onSent(promptText);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

  const RequestData = () => {
    onSent("");
    setInput("");
    setShowLogout(false);
    fetch("/api/reet")
      .then((res) => res.json())
      .then((data) =>
        resultData = data);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Law AI</p>
        <div className="user-container" onClick={toggleLogoutMenu}>
          <img src={assets.user} alt="User" className="user-image" />
          {showLogout && (
            <div
              className="logout-menu"
              style={{ position: "absolute", top: "70px", right: "19px" }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Welcome</span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              resultData.map((message, index) => (
                <>
                  <div
                    className="result-data"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="humanMessage">
                      <p
                        key={index}
                        style={{ marginTop: "30px", marginLeft: "40px" }}
                      >
                        {message.human}
                      </p>
                    </div>
                    <div
                      className="sysMeaasge"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <img src={assets.gemini_icon} alt="" />
                      <p key={index}>{message.ai}</p>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSent();
          }}
        >
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter the Prompt Here...."
              />
              <div>
                <button
                  type="submit"
                  disabled={!input}
                  onClick={RequestData}
                  style={{ border: "none" }}
                >
                  <img src={assets.send_icon} alt="Send" />
                </button>
              </div>
            </div>
            <div className="bottom-info">
              <p>Footer note</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Main;
