import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import logo from "./notey.png";

const Header = ({showButton}) => {
  return (
    <header className="header">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={6} sm={6} md={6} lg={6} className="d-flex">
            <div className="logo-title d-flex align-items-center">
              <img src={logo} alt="Logo" className="logo" />
              <h1 className="app-title">Notepad.io</h1>
            </div>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} className="text-right">
          {showButton && (
              <Button variant="primary" className="signup-login-button">
                log in / signup
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;