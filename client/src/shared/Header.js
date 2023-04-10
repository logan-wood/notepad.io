import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import logo from "./notey.png";

const Header = () => {
  return (
    <header className="header">
      <div className="headerElement">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-title">Notepad.io</h1>
      </div>
      <div>            <Button variant="primary" className="signup-login-button">
        log in / signup
      </Button>
      </div>
    </header>
  );
};

export default Header;