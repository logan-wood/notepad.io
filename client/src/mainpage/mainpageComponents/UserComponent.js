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
    console.log("Deleting user:", selectedUser);
  };

  return (
    <div className="userComponent">
      <button  className="ownerButton">{owner}</button>
      
      {noteData &&
        (() => {
          const buttons = [];
          for (const userId in users) {
            if (userId === owner) continue; // Skip owner (already added
            const userName = users[userId][0];
            buttons.push(
              <div className="users" key={userId}>
                <button onClick={() => handleUserClick(userId)}>
                  {userName}
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
