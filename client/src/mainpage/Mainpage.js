import "../mainpage/mainpage.css";
import Header from "../shared/Header";
import React, { useState } from "react";
import SideNav from "./SideNav";
import { classes } from "./data";
import Note from "./Note";
import { data as initialData } from "./data";
import { findNoteIndex } from "./data";

function Mainpage() {
  //stating Variables
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [data, setData] = useState(initialData);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  //toggle for the side navigation, Initially off
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Handle selection of class from the sideNav
  const handleSelectClass = (selectedClass) => {
    console.log("CLASS", selectedClass);
    setSelectedClass(selectedClass);
  };

  // Handle selection of note from the sideNav
  const handleSelectNote = (selectedNote) => {
    console.log("note", selectedNote);
    setSelectedNote(selectedNote);
  };

  // Handle selection update of note content
  //
  const handleUpdateNote = (updatedNote) => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a deep copy of the previous data
      const newData = { ...prevData };

      // Find the index of the selected class in the classes array
      const classIndex = newData.classes.findIndex(
        (cls) => cls.id === selectedClass.id
      );

      // Find the index of the note to be updated in the notes array of the selected class
      const noteIndex = newData.classes[classIndex].notes.findIndex(
        (note) => note.id === updatedNote.id
      );

      // Update the content of the note in the notes array of the selected class
      newData.classes[classIndex].notes[noteIndex].content =
        updatedNote.content;

      // Return the updated data object
      return newData;
    });

    setSelectedNote(updatedNote);
  };

  return (
    <div className="mainpage">
      {/* header without button */}
      <Header showButton={false} />

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
        SelectedClass={selectedClass}
        SelectedNote={selectedNote}
        updateNote={handleUpdateNote}
      />
    </div>
  );
}

export default Mainpage;
