import React from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import profilePic from "./Components/notelo-profile.png";
const Profile = () => {
  //constants
  const user = useSelector((state) => state.user);
  // state variables for edit mode and edit values
  const [editMode, setEditMode] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(user.email);
  const [editUsername, setEditUsername] = React.useState(user.username);

  //save the edits
  const handleSave = () => {
    //close editmode
    setEditMode(false);
  };
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
          <img src={profilePic} alt="Logo" className="profile-pic" />

          <div className="profile-info">
            <span className="userInfoTitle">Profile Information</span>
            <hr></hr>
            {!editMode ? (
              <>
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
                                <span className="profile-buttons">

                <button onClick={() => setEditMode(true)}>Edit</button>
                </span>
              </>
            ) : (
              <>
                <span className="userInfoItems">
                  <span className="userInfoTitle">UID:</span> {user.uid}
                </span>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Email:</span>
                  <input
                    type="text"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </span>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Username:</span>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                  />
                </span>
                <span className="profile-buttons">
                  <button onClick={handleSave}>Save</button>
                  <button  onClick={() => setEditMode(false)}>Cancel</button>
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
