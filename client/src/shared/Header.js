import React from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import logo from "./notey.png";
import { Link } from "react-router-dom";
import signOutIcon from "./signout_icon.png";
import settingsIcon from "./settings_icon.png";
import profileIcon from "./profile_icon.png";

const Header = ({ showButtons, pageName, showSignOutButton }) => {
  return (
    <header className="header">
      <div className="logo-title d-flex align-items-center">
        <Link to={pageName}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to={pageName} className="app-title link-class">
          <h1 className="app-title">Notepad.io</h1>
        </Link>
      </div>
      {showButtons && (
        <div className="buttons-container">
          <Link to="/login">
            <Button variant="primary" className="login-header-button">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" className="signup-header-button">
              Sign up
            </Button>
          </Link>
        </div>
      )}
      {showSignOutButton && (
        <div className="sign-out-button">
          <Link to="/profile">
            <Button variant="primary" className="profile-button">
              <img src={profileIcon} alt="Profile" className="profile-icon" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="primary" className="settings-button">
              <img src={settingsIcon} alt="Settings" className="settings-icon" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="primary" className="sign-out-button">
              <img src={signOutIcon} alt="Sign Out" className="sign-out-icon" />
              Sign Out
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
