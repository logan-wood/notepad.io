import React from "react";
import "./DeleteButton.css";
import trashcan from "./trashcan.png";

const DeleteButton =  ({ handleDeleteButton, handleDeleteClass, handleDeleteNote, isExpanded, SelectedNote, SelectedClass }) => {
  return (
    <>
      {SelectedClass && (
        <div className="deleteButtonDiv">
          <button
            onClick={handleDeleteButton}
            className="deleteExpandingButton"
          >
            <img src={trashcan} alt="trashcan" className="trashcan" />
            {isExpanded}
          </button>
          {isExpanded && (
            <>
              <button onClick={handleDeleteClass} className="deleteButton">
                Delete Class
              </button>
              {SelectedNote && (
                <button onClick={handleDeleteNote} className="deleteButton">
                  Delete Note
                </button>
              )}
            </>
          )}
        </div>
      )}
      ;
    </>
  );
};
export default DeleteButton;
