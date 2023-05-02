import React, { useState } from "react";
import Header from "../shared/Header.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase.js";
import { Button } from "react-bootstrap";
import "./Signup.css";
import googleLogo from "../loginpage/google_logo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then(() => {
        console.log("User profile updated");
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
          <h2 className="login-title">Sign Up</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="primary"
            className="email-signin-button"
            onClick={signUpWithEmail}
          >
            Sign up with Email
          </Button>
          <div className="or-divider">
            <span className="or-text">or</span>
          </div>
          <Button
            variant="primary"
            className="google-signin-button"
            onClick={signUpWithGoogle}
          >
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign up with Google
          </Button>
          <div className="register-text">Already have an account?</div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
