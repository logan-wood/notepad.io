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
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
          console.log(result);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.message.includes("email-already-in-use") || error.message.includes("undefined is not an object (evaluating 'result.additionalUserInfo.isNewUser')")){
          setError(`Account already exists.`);
        } else {
          setError(`Failed to sign up with Google ${error.message}`);
        }
      });
  };

  const signUpWithEmail = () => {
    console.log("Signing up with email:", email);
    console.log("Signing up with password:", password);
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
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
      <Header showButtons={false} pageName = "/"/>
      <div className="signup-page">
        <div className="signup-box">
          <h2 className="signup-title">Create a New Account</h2>
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
            className="email-signup-button"
            onClick={signUpWithEmail}
          >
            Sign up with Email
          </Button>
          <div className="or-divider">
            <span className="or-text">or</span>
          </div>
          <Button
            variant="primary"
            className="google-signup-button"
            onClick={signUpWithGoogle}
          >
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign up with Google
          </Button>
          <p className="error-message signup-error">{error}</p>
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
