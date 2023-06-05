import React, { useState } from "react";
import "./Components/Profile.css";
import profilePic from "./Components/notelo-profile.png";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
const Profile = ({ user, dispatch }) => {
  //constants
  // state variables for edit mode and edit values
  const [editMode, setEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editUsername, setEditUsername] = useState(user.username);

  //state variables for the correct username and emaikl
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  //database edits
  const handleUpdateUsername = (id, newUsername) => {
    const url =
      "http://localhost:8080/user/" +
      id +
      "/updateUsername?username=" +
      newUsername;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
      .then((response) => {
        console.log(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("data IN SET USER", data);
          dispatch({ type: "SET_USER", payload: data });
          console.log("username updated successfully:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  const handleUpdateEmail = (id, newEmail) => {
    const url =
      "http://localhost:8080/user/" + id + "/updateEmail?email=" + newEmail;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
      .then((response) => {
        console.log(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "SET_USER", payload: data });
          console.log("Email updated successfully:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };
  //save the edits
  const handleSave = () => {
    //check if email is valid
    if (!validEmail(editEmail)) {
      alert("Please enter a valid email");
      setEditEmail(email);
      setEditUsername(username);

      setEditMode(false);
    } else {
      //close editmode and set new email
      if (editEmail !== email) {
        setEmail(editEmail);
      }
      setUsername(editUsername);
      handleUpdateEmail(user.uid, editEmail);
      handleUpdateUsername(user.uid, editUsername);

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
              <a href="/dashboard">
                <button>
                  Return
                  <KeyboardReturnIcon
                    fontSize="large"
                    className="return profile-buttons"
                  />
                </button>
              </a>
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
              <a href="/dashboard">
                <button>
                  Return
                  <KeyboardReturnIcon
                    fontSize="large"
                    className="return profile-buttons"
                  />
                </button>
              </a>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
