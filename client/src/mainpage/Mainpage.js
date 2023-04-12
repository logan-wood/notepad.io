import "../mainpage/mainpage.css";
import Header from "../shared/Header";
import React, { useState } from "react";
import SideNav from "./SideNav";
import { classes } from "./data";
import Note from "./Note";

function Mainpage() {
  const [isNavOpen, setIsNavOpen] = useState(true);

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
  return (
    <div className="mainpage">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');
      </style>
      <Header showButton={false} />

      <SideNav
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        onSelectClass={handleSelectClass}
        onSelectNote={handleSelectNote}
        className="classmenu"
      />
      <Note SelectedClass={selectedClass} SelectedNote={selectedNote}/>
    </div>
  );
}

export default Mainpage;