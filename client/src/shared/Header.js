// Import necessary dependencies
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import logo from "./notey.png";
import { Link, useNavigate } from "react-router-dom";
import signOutIcon from "./signout_icon.png";
import settingsIcon from "./settings_icon.png";
import profileIcon from "./profile_icon.png";
import { useSelector, useDispatch } from "react-redux";
import TaskModal from "./TaskModal.jsx";
import noteyIcon from "./notey.png";

const Header = ({
  showButtons, // determines log in / sign up buttons being shown
  pageName, // determines the page to link to from the logo and title
  showDarkModeButton,
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
          {user ? (<p>{user.username}</p>) : (<p>no user signed in...</p>)}
          <Button className="dark-mode-toggle" onClick={handleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <Link to="/dashboard" className="settings-button">
            <img src={noteyIcon} alt="Settings" className="settings-icon" />
          </Link>
          <Link to="/profile" className="profile-button">
            <img src={profileIcon} alt="Profile" className="profile-icon" />
          </Link>
            <img src={signOutIcon} alt="Sign Out" className="sign-out-icon" onClick={logoutUser}/>
          <TaskModal tasks={tasks} uid={uid} />
        </div>
      )}
    </header>
  );
};

export default Header;
