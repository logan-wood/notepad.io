import React, { useState } from "react";
import Header from "../shared/Header.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase.js";
import { Button } from "react-bootstrap";
import "./Login.css";
import googleLogo from "./google_logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <div className="or-divider">
            <span className="or-text">or</span>
          </div>
          <Button
            variant="primary"
            className="google-signin-button"
            onClick={signInWithGoogle}
          >
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign in with Google
          </Button>
          <Link to="/signup">
            <Button variant="link" className="register-text">
              Don't have an account?
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
