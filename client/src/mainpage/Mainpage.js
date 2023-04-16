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
    setData((prevData) => {
      const updatedNotes = [...prevData.classes[selectedClass.id - 1].notes];
      const noteIndex = findNoteIndex(
        data.classes[selectedClass.id - 1].notes,
        (Note) => Note.id === updatedNote.id
      );
      initialData.classes[selectedClass.id - 1].notes[noteIndex].content =
        updatedNote.content;

      return {
        ...prevData,
        classes: {
          ...prevData.classes,
          [selectedClass.id - 1]: {
            ...prevData.classes[selectedClass.id - 1],
            notes: updatedNotes,
          },
        },
      };
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
