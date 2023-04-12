import React from "react";
import "./Home.css";
import divider from "./divider_strip.png";
import { Button } from "react-bootstrap";
import Header from "../shared/Header";

const MainContent = () => {
  return (
    <>
      <Header showButton={true} />
      <div className="main-content">
        <div className="text-container">
          <h1 className="title">Notepad.io</h1>
          <Button variant="primary" className="get-notey-button">
            Get notey!
          </Button>
        </div>
        <img className="divider-image" src={divider} alt="Divider" />
      </div>
    </>
  );
};

export default MainContent;
