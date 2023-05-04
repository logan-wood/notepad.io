import "./Mainpage.css";
import Header from "../shared/Header";
import React, { useState } from "react";
import SideNav from "./SideNav";
import { classes } from "./data";
import Note from "./Note";
import { data as initialData } from "./data";
import { updateNoteData, updateClassData } from "./data";
import trashcan from "./trashcan.png";

function Mainpage() {
  //stating Variables
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [data, setData] = useState(initialData);
  const [SelectedClass, SetSelectedClass] = useState(null);
  const [SelectedNote, SetSelectedNote] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteButton = () => {
    setIsExpanded(!isExpanded);
  };
  const handleDeleteBlur = () =>{
    setIsExpanded(false);

  };
  //toggle for the side navigation, Initially off
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Handle selection of class from the sideNav
  const handleSelectClass = (selectedClass) => {
    console.log("CLASS", selectedClass);
    SetSelectedClass(selectedClass);
  };

  // Handle selection of note from the sideNav
  const handleSelectNote = (selectedNote) => {
    console.log("note", selectedNote);
    SetSelectedNote(selectedNote);
  };

  // Handle selection update of note content
  //
  const handleUpdateNote = (updatedNote, updatedClass) => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the selected class in the classes array
      const classIndex = newData.classes.findIndex(
        (cls) => cls.id === SelectedClass.id
      );

      // Find the index of the note to be updated in the notes array of the selected class
      const noteIndex = newData.classes[classIndex].notes.findIndex(
        (note) => note.id === updatedNote.id
      );

      // Update the content of the note in the notes array of the selected class
      newData.classes[classIndex].notes[noteIndex].content =
        updatedNote.content;

      //handle update title
      newData.classes[classIndex].notes[noteIndex].title = updatedNote.title;

      // Return the updated data object
      return newData;
    });
    updateNoteData(SelectedClass.id, updatedNote.id, updatedNote);
    SetSelectedNote(updatedNote);
  };

  const handleUpdateClass = (updatedClass) => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the selected class in the classes array
      const classIndex = newData.classes.findIndex(
        (cls) => cls.id === updatedClass.id
      );

      //handle update title
      newData.classes[classIndex].name = updatedClass.name;
      // Return the updated data object
      return newData;
    });

    updateClassData(updatedClass.id, updatedClass);
    SetSelectedClass(updatedClass);
  };

  const handleDeleteClass = () => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the selected class in the classes array
      const classIndex = newData.classes.findIndex(
        (cls) => cls.id === SelectedClass.id
      );

      if (classIndex !== -1) {
      //remove class from array
      newData.classes.splice(classIndex, 1);
      // Return the updated data object
      }
      return newData;
    });

    SetSelectedClass(null);
  };

  const handleDeleteNote = () => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the selected class in the classes array
      const classIndex = newData.classes.findIndex(
        (cls) => cls.id === SelectedClass.id
      );

      // Find the index of the note to be deleted in the notes array of the selected class
      const noteIndex = newData.classes[classIndex].notes.findIndex(
        (note) => note.id === SelectedNote.id
      );
      if (noteIndex !== -1) {
      //remove class from array
      newData.classes[classIndex].notes.splice(noteIndex, 1);
      // Return the updated data object
      }
      return newData;
    });

    SetSelectedNote(null);
  };

  return (
    <div className="mainpage">
      {/* header without log in/sign up buttons, with sign out button */}
      <Header showButtons={false} showSettingsButtons={true}/>

      {/* viewport so that its responsive*/}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>

      {/*style import from google fonts */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');
      </style>

      {/*Side Nav component*/}
      <SideNav
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        onSelectClass={handleSelectClass}
        onSelectNote={handleSelectNote}
        className="classmenu"
        data={initialData}
      />

      {/*Note component*/}
      <Note
        SelectedClass={SelectedClass}
        SelectedNote={SelectedNote}
        updateNote={handleUpdateNote}
        updateClass={handleUpdateClass}
      />
      {/*delete button component */}
      {SelectedClass && (<div className="deleteButtonDiv">
        <button onClick={handleDeleteButton} className="deleteExpandingButton" >
        <img src={trashcan} alt="trashcan" className="trashcan"/>
        {isExpanded}
        </button>
        { isExpanded && (
          <>
            <button onClick={handleDeleteClass} className="deleteButton" >
              Delete Class
            </button>
            {SelectedNote && (
              <button onClick={handleDeleteNote} className="deleteButton">
                Delete Note
              </button>
            )}
          </>
        )}
      </div>)}
    </div>
  );
}

export default Mainpage;
