import React, { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

function Login({ history}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCookie = (jwtToken) => {
    Cookies.set("jwtToken", jwtToken, { expires: 1 });
    history.push("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch("https://test-vnpf.onrender.com/login", options);
    if (response.ok) {
      const jwt_token = await response.json();
      setShowErrorMsg(false);
      handleCookie(jwt_token.jwtToken);
    } else {
      const error = await response.json();
      setShowErrorMsg(true);
      setErrorMsg(error.errorMsg);
    }
  };

  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-card-container" onSubmit={onSubmit}>
        <h1 className="login-title">Admin Login</h1>
        <label htmlFor="username" className="input-label">
          Username:
        </label>
        <br />
        <input
          placeholder="Enter your username"
          className="input-box"
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
        />
        <label htmlFor="password" className="input-label">
          Password:
        </label>
        <br />
        <input
          placeholder="Enter your password"
          className="input-box"
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        {showErrorMsg && <p className="err-msg">*{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;
