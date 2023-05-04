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
    .then((response) => {
      // user found
      if (response.status === 200) {
        document.cookie = `sessionID=${response.headers.get('X-Session-ID')};`

        return response.json()
      } else {
        // no user found, display message
        setMessage("No user found")
      }
    })
    .then(data => {
      console.log(data)
      dispatch({ type: 'SET_USER', payload: data })
    })
    .catch(error => {
      console.error(error)
    })
  };

  const logoutUser = () => {
    dispatch({ type: 'CLEAR_USER' })
  }

  return (
    <>
      <Header showButton={false} />
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
          <div className="register-text">Don't have an account?</div>
          <div>{user ? (<p>Welcome back, {user.username}</p>) : (<p>no user signed in...</p>)}</div>
          <div>{message ? (<p>{message}</p>) : (<p></p>)}</div>
          <div><button onClick={() => logoutUser()}>Logout User</button></div>
        </div>
      </div>
    </>
  );
};

export default Login;
