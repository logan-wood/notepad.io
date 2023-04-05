import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import logo from "client/public/notey.png";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <Col sm={8} className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="app-title">Notepad.io</h1>
          </Col>
          <Col sm={4} className="d-flex justify-content-end align-items-center">
            <Button variant="primary" className="signup-login-button">
              log in / signup
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;