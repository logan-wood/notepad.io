// import required dependencies
import React from "react";
import "./Home.css";
import divider from "./divider_strip.png";
import { Button } from "react-bootstrap";
import Header from "../shared/Header";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      {/* Shows header with log in and sign up buttons, logo and title links back to same page */}
      <Header showButtons={true} pageName = "/"/> 
      <div className="main-content">
        <div className="text-container">
          <h1 className="title">Notepad.io</h1>
          {/* Links to sign up page */}
          <Link to="/signup">
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
