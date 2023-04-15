import "../mainpage/mainpage.css";
import Header from "../shared/Header";
import React, { useState } from "react";
import SideNav from "./SideNav";
import { classes } from "./data";
import Note from "./Note";
import { data  as initialData } from "./data";
import { findNoteIndex } from "./data";

function Mainpage() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [data, setData] = useState(initialData);

  //selected notes
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSelectClass = (selectedClass) => {
    console.log("CLASS", selectedClass);
    setSelectedClass(selectedClass);
  };
  const handleSelectNote = (selectedNote) => {
    console.log("note", selectedNote);
    setSelectedNote(selectedNote);
  };

  const handleUpdateNote = (updatedNote) => {
    setData((prevData) => {
      const updatedNotes = [...prevData.classes[selectedClass.id-1].notes];
      const noteIndex = findNoteIndex(
        data.classes[selectedClass.id-1].notes,
        (Note) => Note.id === updatedNote.id
      );
      initialData.classes[selectedClass.id-1].notes[noteIndex].content = updatedNote.content;


        return {
          ...prevData,
          classes: {
            ...prevData.classes,
            [selectedClass.id-1]: {
              ...prevData.classes[selectedClass.id-1],
              notes: updatedNotes
            }
          }
        };

    });

    setSelectedNote(updatedNote);
  };

  

  return (
    <div className="mainpage">
      <Header showButton={false} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');
      </style>

      <SideNav
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        onSelectClass={handleSelectClass}
        onSelectNote={handleSelectNote}
        className="classmenu"
        data={initialData}
      />
      <Note
        SelectedClass={selectedClass}
        SelectedNote={selectedNote}
        updateNote={handleUpdateNote}
      />
    </div>
  );
}

export default Mainpage;
