import React from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import profilePic from "./Components/notelo-profile.png";
const Profile = () => {
  const user = useSelector((state) => state.user);
    
  return (
    <>
      <Header
        showButtons={false}
        showDarkModeButton={true}
        showDashBoardButtons={true}
      />
      <div className="profile-setting">
        <div className="side-bar">test</div>

        <div className="profile">
          <img src={profilePic} alt="Logo" className="profile-pic" />

          <div className="profile-info">
            <span className="userInfoTitle">Profile Information</span>
            <hr></hr>
            {user && (
              <>
                <span className="userInfoItems">
                  <span className="userInfoTitle">UID:</span> {user.uid}
                </span>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Email:</span> {user.email}
                </span>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Username:</span>{" "}
                  {user.username}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
