import "./Mainpage.css";
import Header from "../shared/Header";
import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Note from "./Note";
import dataInData, { updateNoteData, updateClassData,getDatabaseData } from "./data";
import trashcan from "./trashcan.png";
import ProgressGameBar from "./ProgressGameBar";
import GameModal from "./GameModal";
import DeleteButton from "./DeleteButton";
import { Button } from "react-bootstrap";
import GameFrame from '../gameframe/GameFrame';

function Mainpage() {
  //State hooks for isGameOpen, Progress, reset, isNavOPen, data, selected Class, Selected note, and isExpanded
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reset, setReset] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [data, setData] = useState({ classes: [] });
  const [SelectedClass, SetSelectedClass] = useState(null);
  const [SelectedNote, SetSelectedNote] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
 

  //handler for delete buttons
  const handleDeleteButton = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteBlur = () => {
    setIsExpanded(false);
  };

  //handler for game compoenent
  const handleGameClose = () => {
    setIsGameOpen(false);
    handleReset();
  };
  const handleReset = () => {
    console.log("handleReset called");
    setProgress(0);
    console.log("progress set to 0");
    setReset(true);
    updateNoteProgress(0);
  };
  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const handleGameButtonClick = () => {
    setIsGameOpen(true);
  };

  //update Note Progress
  const updateNoteProgress = (value) => {
    console.log(value);
    setProgress(value);
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
  useEffect(() => {
    const fetchData = async () => {
     await getDatabaseData();
      console.log("get DB data in mainpage", dataInData);
      setData(dataInData);
    };
    fetchData();
  }, []);

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
      handleDatabaseUpdateClass(SelectedClass);

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
      handleDatabaseUpdateClass(SelectedClass);

      return newData;
    });

    updateClassData(updatedClass.id, updatedClass);
    SetSelectedClass(updatedClass);
  };

  // handle for updating the
  const handleDatabaseUpdateClass = (data) => {
     // constant url for testing purposes
  const url = "http://localhost:8080/user/12345/updateClass";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(data), // Pass the data you want to send in the request body as a JSON string
    })
      .then((response) => {
        console.log(JSON.stringify(data));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  // Handle for deleting a note from the database
  const handleDatabaseDeleteNote = (data,selectedClassId,selectedNoteId) => {
    const url = "http://localhost:8080/user/12345/removeNote?classId="+selectedClassId+"&&noteId="+selectedNoteId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(data), // Pass the data you want to send in the request body as a JSON string
    })
      .then((response) => {
        console.log(JSON.stringify(data));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  const handleDatabaseDeleteClass = (data, selectedClassId) => {
    const url = "http://localhost:8080/user/12345/removeClass?classId="+selectedClassId;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(data), // Pass the data you want to send in the request body as a JSON string
    })
      .then((response) => {
        console.log(JSON.stringify(data));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  const handleDeleteClass = () => {
    

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
      handleDatabaseDeleteClass(SelectedClass, SelectedClass.id);

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
      handleDatabaseDeleteNote(SelectedNote, SelectedClass.id, SelectedNote.id);

      return newData;
    });

    SetSelectedNote(null);
  };

  return (
   
    <div className="mainpage">
      {/* header without log in/sign up buttons, with sign out button */}
      <Header showButtons={false} showDarkModeButton={true} showDashBoardButtons={true}/>

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
        data={data}
      />

      {/*Note component*/}
      <Note
        SelectedClass={SelectedClass}
        SelectedNote={SelectedNote}
        updateNote={handleUpdateNote}
        updateClass={handleUpdateClass}
        updateProgress={updateNoteProgress}
        progress={progress}
        isReset={reset}
      />

      <ProgressGameBar
        progress={progress}
        onButtonClick={handleGameButtonClick}
      />

      <GameModal isOpen={isGameOpen} onClose={handleGameClose} />
      {/* <GameFrame /> */}

      {/*delete button component */}
      <DeleteButton
        handleDeleteButton={handleDeleteButton}
        handleDeleteClass={handleDeleteClass}
        handleDeleteNote={handleDeleteNote}
        isExpanded={isExpanded}
        SelectedNote={SelectedNote}
        SelectedClass={SelectedClass}
      />

      <Button
        onClick={handleDatabaseUpdateClass(SelectedClass)}
        className="save-button"
      >
        Save Note
      </Button>
    </div>
  );
}

export default Mainpage;
