import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./UserComponent.css";

const UserComponent = ({ noteData }) => {
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
     if (noteData) {
       setUsers(noteData.users);
       setOwner(noteData.owner);
     }
  }, [noteData]);
  
 const handleUserClick = (userId) => {
   setSelectedUser(userId);
 };

 const handleDeleteUser = () => {
   console.log("Deleting user:", selectedUser);
 };

  return (
    <div className="userComponent">
      <button>{owner}</button>
      {noteData &&
        (() => {
          const buttons = [];
          for (const userId in users) {
            if(userId === owner) continue; // Skip owner (already added
            const userName = users[userId][0];
            buttons.push(
              <div key={userId}>
                <button onClick={() => handleUserClick(userId)}>
                  {userName}
                </button>
                {selectedUser === userId && (
                  <button onClick={handleDeleteUser}>Delete User</button>
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
