import React from "react";
import "./Home.css";
import divider from "./divider_strip.png";
import { Button } from "react-bootstrap";
import Header from "../shared/Header";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <Header showButtons={true} />
      <div className="main-content">
        <div className="text-container">
          <h1 className="title">Notepad.io</h1>
          <Link to="/dashboard">
            <Button variant="primary" className="get-notey-button">
              Get notey!
            </Button>
          </Link>
        </div>
        <img className="divider-image" src={divider} alt="Divider" />
      </div>
    </>
  );
};

export default MainContent;
