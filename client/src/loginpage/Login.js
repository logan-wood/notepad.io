import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // You can get user information and access token here
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log In</h2>
        <button onClick={signInWithGoogle}>Log in with Google</button>
      </div>
    </div>
  );
};

export default Login;
