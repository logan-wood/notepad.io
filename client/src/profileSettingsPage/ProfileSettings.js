import React from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const ProfileSettings = () => {
  //constants
  const user = useSelector((state) => state.user);
 //render
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
        <Profile user={user}/>
        </div>
        </div></>

        );
};

export default ProfileSettings;
