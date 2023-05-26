import React, { useState } from "react";
import "./Components/Profile.css";
import profilePic from "./Components/notelo-profile.png";
import { Link, useNavigate } from "react-router-dom";

const Settings = ({ user, dispatch }) => {
  //constants
  // state variables for note and class  values
  const [deleteMode, setDeleteMode] = useState(false);
  const [noteCount, setNoteCount] = useState("");
  const [classCount, SetClassCount] = useState("");
  const [editEmail, setEditEmail] = useState("");
  // redirection & navigation
  const navigate = useNavigate();

  //state variables for the correct username and emaikl
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleDelete = () => {
    //check if editUsername is same as user username
    //if not, then cancel
    //else, delete account
    if (editEmail !== user.email) {
      alert("Email does not match. Please try again.");
      setEditEmail("");
      setDeleteMode(false);

      return;
    } else {
      //delete acocunt and redirect login page
      dispatch({ type: "CLEAR_USER" });
      navigate("/");
    }
  };

  const handleCancel = () => {
    setDeleteMode(false);
    setEditEmail("");
  };

  //render
  return (
    <>
      <img src={profilePic} alt="Logo" className="profile-pic" />

      <div className="profile-info">
        <span className="userInfoTitle">Settings Information</span>
        <hr></hr>
        {!deleteMode ? (
          <>
            {user && (
              <>
                <span className="userInfoItems">
                  <span className="userInfoTitle">Total Points:</span> //put
                  points here
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
              <button onClick={() => setDeleteMode(true)}>
                Delete Account
              </button>
            </span>
          </>
        ) : (
          <>
            Deleting an account is permanent. Are you sure you want to delete
            your account? Enter your Email to confirm.
            <span className="userInfoItems">
              <span className="userInfoTitle  non-highlightable">Email:</span>
            <span className="non-highlightable" >{user.email}</span>
            </span>
            <span className="userInfoItems">
              <span className="userInfoTitle">Confirm Email:</span>
              <input
                type="text"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </span>
            <span className="profile-buttons">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleCancel}>Cancel</button>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
