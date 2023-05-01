import React from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import logo from "./notey.png";
import { Link } from "react-router-dom";

const Header = ({ showButton }) => {
  return (
    <header className="header">
      <div className="logo-title d-flex align-items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <h1 className="app-title">Notepad.io</h1>
      </div>
      {showButton && (
        <Link to="/login">
          <Button variant="primary" className="signup-login-button">
            Log in / Sign up
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
