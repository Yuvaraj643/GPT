import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Login";
import authService from "./authService";

const ProtectedRoute = ({ element: Component }) => {
  return authService.isAuthenticated() ? (
    <Component />
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<ProtectedRoute element={Home} />} /> 
          <Route path="/chat/:chatid" element={<ProtectedRoute element={Home} />} /> 
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
