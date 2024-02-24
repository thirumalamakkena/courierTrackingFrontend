import React from "react";
import "./index.css";
import { withRouter } from "react-router-dom/";
import Cookies from "js-cookie";

const handleLogout = () => {
    Cookies.remove("jwtToken");
    window.location.reload();
};

const Header = ({ history }) => {
  const handleLogin = () => {
    history.push("/login");
  };
  const jwtToken = Cookies.get("jwtToken");
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Courier Tracking</div>
        <div className="navbar-buttons">
          {jwtToken === undefined ? (
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
