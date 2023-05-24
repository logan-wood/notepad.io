import React from "react";
import "./Components/Profile.css";
import Header from "../shared/Header";
import profilePic from "./Components/notelo-profile.png";
const Profile = ({user}) => {
  //constants
  // state variables for edit mode and edit values
  const [editMode, setEditMode] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(user.email);
  const [editUsername, setEditUsername] = React.useState(user.username);

  //save the edits
  const handleSave = () => {
    //check if email is valid
    if (!validEmail(editEmail)) {
      alert("Please enter a valid email");
      setEditMode(false);

      return;
    }
    //close editmode
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
                      <span className="userInfoTitle">Email:</span> {editEmail}
                    </span>
                    <span className="userInfoItems">
                      <span className="userInfoTitle">Username:</span>{" "}
                      {editUsername}
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
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </span>
              </>
            )}
          </div>
        
    </>
  );
};

export default Profile;
