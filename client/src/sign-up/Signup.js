import React, { useState } from "react";
import Header from "../shared/Header.js";
import { Button } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUpWithEmail = () => {
    // check fields are not blank
    if (name === "" || email === "" || password === "") {
      setError("Please enter a valid name, email and password")
      return
    } 

    fetch(process.env.REACT_APP_API_DOMAIN + "/addNewUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        displayName: name,
        email: email,
        password: password
      })
    })
    .then((response) => {
      // success/error handling
      if (response.status === 201) {
        setError('')
        navigate('/login')
      } else if (response.status === 409) {
        setError('This email is already in use')
      } else {
        setError('An error occured. Please try again later')
      }
    })
    .catch((error) => {
      console.error(error)
      setError('An unknown error occured. Please try again later')
    })
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
