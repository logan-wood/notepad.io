import React, { useState } from "react";
import Header from "../shared/Header.js";
import { Button } from "react-bootstrap";
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // shared across different react files/components
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signInWithEmail = () => {
    if (email === '' || password === '') {
      setError("Please enter an email and password")
      return
    }

    fetch(process.env.REACT_APP_API_DOMAIN + "/loginUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(async (response) => {
      // user found
      if (response.status === 200) {
        const data = await response.json()
        return data
      } else if (response.status === 404){
        console.log(response)
        setError("No user found")
      } else if (response.status === 401) {
        setError("Incorrect password")
      } else {
        setError("An error occured. Please try again later")
      }
    })
    .then((data) => {
      if (data)
      {
        dispatch({ type: 'SET_USER', payload: data })

        navigate('/dashboard')
      }
    })
    .catch(error => {
      console.error(error)
    })
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

