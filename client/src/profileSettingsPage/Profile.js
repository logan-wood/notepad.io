import React, { useState } from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import profilePic from "./Components/notelo-profile.png";
const Profile = ({ user }) => {
  //constants
  // state variables for edit mode and edit values
  const [editMode, setEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editUsername, setEditUsername] = useState(user.username);

  //state variables for the correct username and emaikl
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  //save the edits
  const handleSave = () => {
    //check if email is valid
    if (!validEmail(editEmail)) {
      alert("Please enter a valid email");
      setEditEmail(email);
      setEditMode(false);

    } else {
      //close editmode and set new email
      setEmail(editEmail);
      setEditMode(false);
    }
  };
 const handleCancel = () => {
  
     //close editmode and set new email
      setEditEmail(email);
      setEditUsername(username);
     setEditMode(false);
   
 };
  //function to check regex of email
  const validEmail = (email) => {
    //regex for valid email
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    //check if email matches the pattern
    return emailPattern.test(email);
  };
  //render
  return (
    <>
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
                  <span className="userInfoTitle">Email:</span> {email}
                </span>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Username:</span> {username}
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
              <button onClick={handleCancel}>Cancel</button>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
