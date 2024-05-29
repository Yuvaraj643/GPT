import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./authService";
import "./login.css"; // Import the CSS file

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authService.login(password);
    if (success) {
      navigate("/chat");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>This is the description of the login page.</div>
    </div>
  );
};

export default Login;
