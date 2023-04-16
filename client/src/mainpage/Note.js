import React from "react";

const Note = ({ SelectedClass, SelectedNote }) => {
    if (!SelectedClass || !SelectedNote) {
        return <div className="note">Click on something...</div>; 
      }
  return (
    <div className="note">

      <h3>{SelectedClass.name}</h3>
      <h1>{SelectedNote.title}</h1>
      <br></br>
      <p>{SelectedNote.content}</p>
    </div>
  );
};
export default Note;
