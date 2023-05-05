import React, { useState, useContext } from "react";
import Header from "../shared/Header.js";
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { app } from "../firebase.js";
// import googleLogo from "./google_logo.png";
import { Button } from "react-bootstrap";
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import googleLogo from "./google_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // shared across different react files/components
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signInWithEmail = () => {
    fetch(process.env.REACT_APP_API_DOMAIN + '/loginUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(async (response) => {
      // user found
      if (response.status === 200) {
        const data = await response.json()
        return data
      } else {
        setMessage("No user found")
      }
    })
    .then((data) => {
      dispatch({ type: 'SET_USER', payload: data })
      setMessage("Welcome back, " + user.username)

      // show link to dash
      const link = document.getElementById("visit-dashboard");
      link.style.display = "block";
    })
    .catch(error => {
      console.error(error)
    })
  };

  return (
    <>
      <Header showButtons={false} pageName = "/" />
      <div className="login-page">
        <div className="login-box">
          <h2 className="login-title">Log in</h2>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: "0",
              display: "block",
              width: "100%",
            }}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: "0",
              display: "block",
              width: "100%",
            }}
          />
          <Button
            variant="primary"
            className="email-signin-button"
            onClick={signInWithEmail}
          >
            Sign in with Email
          </Button>
          {/* <div className="or-divider">
            <span className="or-text">or</span>
          </div>
          <Button
            variant="primary"
            className="google-signin-button"
            onClick={signInWithGoogle}
          >
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign in with Google
          </Button> */}
          <div>{message ? (<p>{message}</p>) : (<p></p>)}</div>
          <a href='/dashboard' id='visit-dashboard' style={{display: 'none'}}>dashboard</a>
          <div className="button-group">
            {/* <Button
              variant="primary"
              className="google-signin-button"
              onClick={signInWithGoogle}
            >
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              Sign in with Google
            </Button>
            <p className="error-message signin-error">{error}</p> */}
            <Link to="/signup">
              <Button variant="link" className="register-button">
                Don't have an account?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
