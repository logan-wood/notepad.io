// import required dependancies
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
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';

const SignUp = () => {
  // set state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  

  // google sign up fuctionality
  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) { // checks if user has signed up before
          // move user to dashboard
          navigate("/dashboard");
        }
      })
      .catch((error) => { 
        // if user has sign up before
        if (error.message.includes("email-already-in-use") || error.message.includes("undefined is not an object (evaluating 'result.additionalUserInfo.isNewUser')")){
          // prompt user to log in
          setError(`Account already exists. Please log in.`);
        } else {
          // notify user of other error
          setError(`Failed to sign up with Google ${error.message}`);
        }
      });
  };

  // email sign in fuctionality
  const signUpWithEmail = () => {

    // debugging purposes
    console.log("Signing up with email:", email);
    console.log("Signing up with password:", password);
    
    // attempts creates new account from user input
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // if successful, move user to dashboard
        navigate("/dashboard");
        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then(() => {
        // debugging purposes
        console.log("User profile updated");
      })
      .catch((error) => {
        // notify user of error
        setError(`Failed to sign up with email ${error.message}`);
      });
  };

  // return the Login element
  return (
    <>
      {/* Displays header without login or sign up buttons, links back to landing page */}
      <Header showButtons={false} pageName = "/"/>
      <div className="signup-page">
        <div className="signup-box">
          <h2 className="signup-title">Create a New Account</h2>
          {/* Get user input for name */}
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: "0",
              display: "block",
              width: "100%",
            }}
          />
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
          {/* calls signUpWithEmail function on activation */}
          <Button
            variant="primary"
            className="email-signup-button"
            onClick={signUpWithEmail}
          >
            Sign up with Email
          </Button>
          <div className="or-divider">
            <span className="or-text">or</span>
          </div>
          {/* calls signUpWithGoogle function on activation */}
          <Button
            variant="primary"
            className="google-signup-button"
            onClick={signUpWithGoogle}
          >
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign up with Google
          </Button>
          {/* Diplays error message, if any */}
          <p className="error-message signup-error">{error}</p>
          {/* send user to log in page on activation */}
          <Link to="/login">
            <Button variant="link" className="login-button">
              Already have an account?
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
