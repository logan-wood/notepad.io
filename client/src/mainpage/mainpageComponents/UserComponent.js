import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./UserComponent.css";

const UserComponent = ({ noteData }) => {
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For modal

  useEffect(() => {
    if (noteData) {
      setUsers(noteData.users);
      setOwner(noteData.owner);
    }
  }, [noteData]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setIsOpen(!isOpen);
  };

  const handleDeleteUser = () => {
     // constant url for testing purposes
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/note/" +
      noteData.id +
      "/removeSharedUser/?id="+selectedUser;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      
    })
      .then((response) => {
        if (response.status === 200) {
    console.log("Deleting user:", selectedUser);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  
    setIsOpen(!isOpen);
  };

  return (
    <div className="userComponent">
      <button className="ownerButton">{owner}</button>

      {noteData &&
        (() => {
          const buttons = [];
          for (const userId in users) {
            if (userId === owner) continue; // Skip owner (already added
            const userName = users[userId][0];
            buttons.push(
              <div className="users" key={userId}>
                <button onClick={() => handleUserClick(userId)}>
                  <span title={users[userId]}>{userName}</span>
                </button>
                {selectedUser === userId && isOpen && (
                  <button
                    className="deleteUserButton"
                    onClick={handleDeleteUser}>
                    Remove User
                  </button>
                )}
              </div>
            );
          }
          return buttons;
        })()}
    </div>
  );
};
export default UserComponent;
