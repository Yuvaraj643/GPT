import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import authService from "../../authService";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
    setResultData
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
        {/*  */}
        <Chat resultData={resultData} />
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSent(input, setResultData);
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
