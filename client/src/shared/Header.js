// Import necessary dependencies
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import logo from "./assets/notey.png";
import { Link, useNavigate } from "react-router-dom";
import signOutIcon from "./assets/signout_icon.png";
import profileIcon from "./assets/profile_icon.png";
import { useSelector, useDispatch } from "react-redux";
import TaskModal from "./TaskModal.jsx";
import darkIcon from "./assets/dark.png";
import lightIcon from "./assets/light.png";

const Header = ({
  showButtons, // determines log in / sign up buttons being shown
  pageName, // determines the page to link to from the logo and title
  showDashBoardButtons,
  tasks,
  uid,
}) => {
  // state variable to hold value of darkMode setting
  const [isDarkMode, setIsDarkMode] = useState(false);

  // handles the toggle of the dark mode button
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    console.log(tasks);
  };

  // user object
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // redirection & navigation
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch({ type: "CLEAR_USER" });
    navigate("/");
  };

  return (
    <header className={`header ${isDarkMode ? "dark-mode" : ""}`}>
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
      {showDashBoardButtons && (
        <div className="dashboard-buttons-container">
           <div className="dashboard-item">
            <TaskModal tasks={tasks} uid={uid} />
          </div>
          <div className="dashboard-item">
            {user ? <p>{user.username}</p> : <p>no user signed in...</p>}
          </div>
          <div className="dashboard-item">
            <Button className="dark-mode-toggle" onClick={handleDarkMode}>
              <img
                src={isDarkMode ? lightIcon : darkIcon}
                alt="Dark Mode Toggle"
                className="dark-toggles"
              />
            </Button>
          </div>
          <div className="dashboard-item">
            <Link to="/profile" className="profile-button">
              <img src={profileIcon} alt="Profile" className="profile-icon" />
            </Link>
          </div>
          <div className="dashboard-item">
            <img
              src={signOutIcon}
              alt="Sign Out"
              className="sign-out-icon"
              onClick={logoutUser}
            />
          </div>
         
        </div>
      )}
    </header>
  );
};

export default Header;
