import React from "react";
import Header from "../shared/Header.js";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = () => {
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

  return (
    <>
      <Header showButton={false} />
      <div className="login-page">
        <div className="login-box">
          <h2 className="login-title">Log in</h2>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
    </>
  );
};

export default Login;
