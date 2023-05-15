import React, { useState } from "react";
import Header from "../shared/Header.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.js";
import { Button } from "react-bootstrap";
import "./Login.css";
import googleLogo from "./google_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
          const userRef = doc(app, "users", result.user.uid);
          await setDoc(userRef, {
            signedUpWithGoogle: true,
          });
        }

        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.message.includes(
            "undefined is not an object (evaluating 'result.additionalUserInfo.isNewUser')"
          )
        ) {
          setError(`Error signing in with Google: ${error.message}`);
        } else if (
          error.message.includes("Firebase: Error (auth/popup-closed-by-user).")
        ) {
          // do nothing
        } else {
          setError(`Error signing in with Google: ${error.message}`);
        }
      });
  };

  // shared across different react files/components
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signInWithEmail = () => {
    fetch(process.env.REACT_APP_API_DOMAIN + "/loginUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          return data;
        } else {
          setError("No user found");
        }
      })
      .then((data) => {
        dispatch({ type: "SET_USER", payload: data });
        setError("Welcome back, " + user.username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header showButtons={false} pageName="/" />
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
          <div className="button-group">
            <Button
              variant="primary"
              className="google-signin-button"
              onClick={signInWithGoogle}
            >
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              Sign in with Google
            </Button>
            <p className="error-message signin-error">{error}</p>
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

