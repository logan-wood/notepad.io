import React from "react";
import "./Profile.css";
import { Button } from "react-bootstrap";
import Header from "../shared/Header";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Header showButtons={true} pageName = "/"/>
      <div className="main-content">
        <div className="text-container">
          <h1 className="title">Notepad.io</h1>
          <Link to="/signup">
            <Button variant="primary" className="get-notey-button">
              Get notey!
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
