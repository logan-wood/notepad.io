// Import required dependancies
import React, { useState } from "react";
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

// 
const Login = () => {
  // Declare state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // google sign in fuctionality
  const signInWithGoogle = () => {

    signInWithPopup(auth, provider) // prompts the user for sign in with google 
    .then(async (result) => { // gets result

      // if user is not a new user/has signed up before
      if (result.additionalUserInfo && !result.additionalUserInfo.isNewUser) {
        const userRef = doc(app, "users", result.user.uid); // get userRef
        await setDoc(userRef, {
          signedUpWithGoogle: true, // successful sign in attempt
        });
      }
      // move user to the dashboard 
      navigate("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      if(error.message.includes(
        // notify user of unsuccessful sign in due to an account not found
        "undefined is not an object (evaluating 'result.additionalUserInfo.isNewUser')")){
        setError(`Account not found. Please sign up.`); // prompt to sign up instead. 
      } else if (error.message.includes("Firebase: Error (auth/popup-closed-by-user).")) {
        // do nothing
      } else {
        // notify user of their error
        setError(`Error signing in with Google: ${error.message}`);

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

  // email sign in fuctionality
  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password) // checks email and password match
      .then((result) => { 
        // move user to dashboard if successful
        navigate("/dashboard");
      })
      .catch((error) => {
        // notify user of error
        setError(`Error signing in with Email: ${error.message}`);
      });
      // show link to dash
      const link = document.getElementById("visit-dashboard");
      link.style.display = "block";
    })
    .catch(error => {
      console.error(error)
    })
  };

  // return the Login element
  return (
    <>
    {/* Displays header without login or sign up buttons, links back to landing page */}
      <Header showButtons={false} pageName = "/" />
      <div className="login-page">
        <div className="login-box">
          <h2 className="login-title">Log in</h2>
          {/* Get user input for email */}
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
          {/* Get user input for password */}
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
          {/* calls signInWithEmail function on activation */}
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
            {/* calls signInWithGoogle function on activation */}
            {/* <Button
              variant="primary"
              className="google-signin-button"
              onClick={signInWithGoogle}
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              Sign in with Google
            </Button>
            {/* Diplays error message, if any */}
            <p className="error-message signin-error">{error}</p>
            {/* send user to sign up page on activation */}
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
