import React from "react";
import "./DeleteButton.css";
import trashcan from "./trashcan.png";

const DeleteButton = ({
  handleDeleteButton,
  handleDeleteClass,
  handleDeleteNote,
  handleDeleteSharedNote,
  isExpanded,
  SelectedNote,
  SelectedClass,
  isShareNote,
}) => {
  return (
    <>
      {SelectedClass && (
        <div className="deleteButtonDiv">
          <button
            onClick={handleDeleteButton}
            className="deleteExpandingButton">
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
      {isShareNote && (
        <div className="deleteButtonDiv">
          <button
            onClick={handleDeleteButton}
            className="deleteExpandingButton">
            <img src={trashcan} alt="trashcan" className="trashcan" />
            {isExpanded}
          </button>
          {isExpanded && (
            <>
              <button onClick={handleDeleteSharedNote} className="deleteButton">
                Delete Shared Note
              </button>
            </>
          )}
        </div>
      )}
      ;
    </>
  );
};
export default DeleteButton;
