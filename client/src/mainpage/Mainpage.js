import "./mainpageComponents/Mainpage.css";
import Header from "../shared/Header";
import React, { useRef, useState, useEffect } from "react";
import SideNav from "./mainpageComponents/SideNav";
import Note from "./mainpageComponents/Note";
import dataInData, {
  addNewSharedNote,
  updateNoteData,
  updateClassData,
  getDatabaseData,
  getSharedNoteData,
  updateSharedNoteData,
  getDatabaseTasks,
} from "./mainpageComponents/data";
import trashcan from "./mainpageComponents/trashcan.png";
import ProgressGameBar from "./mainpageComponents/ProgressGameBar";
import GameModal from "./mainpageComponents/GameModal";
import DeleteButton from "./mainpageComponents/DeleteButton";
import { Button } from "react-bootstrap";
import ShareModal from "./mainpageComponents/ShareModal";
import { useSelector } from "react-redux";
import Loading from "./mainpageComponents/Loading.jsx";
import Tesseract from "tesseract.js";

function Mainpage() {
  //State hooks for isGameOpen, Progress, reset, isNavOPen, data, selected Class, Selected note, and isExpanded
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [progress, setProgress] = useState(0);
  const [reset, setReset] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [data, setData] = useState({ classes: [], sharedNotes: [], tasks: [] });
  const [SelectedClass, SetSelectedClass] = useState(null);
  const [SelectedNote, SetSelectedNote] = useState(null);
  const [SelectedShareNote, SetSelectedShareNote] = useState(null);
  const [isShared, setIsShared] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  //user object
  const user = useSelector((state) => state.user);

  useEffect(() => {
    function handleClickShareOutside(event) {
      if (isShareOpen && !event.target.closest(".modalShareWrapper")) {
        setIsShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickShareOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickShareOutside);
  }, [isShareOpen]);

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
  //handler for share component
  const handleShareClose = () => {
    setIsShareOpen(false);
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

  const handleShareButtonClick = () => {
    setIsShareOpen(true);
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

  const handleIsShare = (isShare) => {
    setIsShared(isShare);
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
      await getDatabaseData(user.uid);
      console.log("get DB data in mainpage", dataInData);
      setData(dataInData);
    };
    fetchData();
    const fetchData2 = async () => {
      await getSharedNoteData(user.uid);
      console.log("get DB data in mainpage", dataInData);
      setData(dataInData);
    };
    fetchData2();
  }, []);

  // Handle selection update of note content
  //
  const handleUpdateNote = (updatedNote, updatedClass) => {
    // callback function that recieves the previous state
    if (isShared) {
      handleUpdateShareNote(updatedNote);
    } else {
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
    }
  };

  const handleNoteShared = () => {
    // Update the shared note in the data.js file
    addNewSharedNote(SelectedNote, user.uid);
    handleDeleteNote();
  };
  // Handle selection update of note content
  //
  const handleUpdateShareNote = (updatedShareNote) => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the selected sharednote in the Shared Note array
      const shareNoteIndex = newData.sharedNotes.findIndex(
        (sharedNote) => sharedNote.id === updatedShareNote.id
      );

      // Update the content of the note in the notes array of the selected class
      newData.sharedNotes[shareNoteIndex].content = updatedShareNote.content;
      //handle update title
      newData.sharedNotes[shareNoteIndex].title = updatedShareNote.title;
      newData.sharedNotes[shareNoteIndex].users = updatedShareNote.users;

      handleDatabaseUpdateClass(SelectedShareNote);

      // Return the updated data object
      return newData;
    });
    updateSharedNoteData(updatedShareNote.id, updatedShareNote);
    SetSelectedNote(updatedShareNote);
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
  const handleDatabaseUpdateClass = async (data) => {
    // constant url for testing purposes
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/user/" +
      user.uid +
      "/updateClass";
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
          setError("An error occured. Please try again later");
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        setError("An error occured. Please try again later");
        console.error("There was an error sending the request:", error);
      });
  };

  // Handle for deleting a note from the database
  const handleDatabaseDeleteNote = async (
    data,
    selectedClassId,
    selectedNoteId
  ) => {
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/user/" +
      user.uid +
      "/removeNote?classId=" +
      selectedClassId +
      "&&noteId=" +
      selectedNoteId;

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
          setError("An error occured. Please try again later.");
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        setError("An error occured. Please try again later.");
        console.error("There was an error sending the request:", error);
      });
  };
  // Handle for deleting a shared note from the database
  const handleDatabaseDeleteSharedNote = async (data) => {
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/note/" +
      SelectedNote.id +
      "/removeSharedNote";

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
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

  const handleDatabaseDeleteClass = async (data, selectedClassId) => {
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/user/" +
      user.uid +
      "/removeClass?classId=" +
      selectedClassId;

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
          setError("An error occured. Please try again later.");
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data); // Do something with the response data
      })
      .catch((error) => {
        setError("An error occured. Please try again later.");
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
      SelectedClass.noteSize--;
      handleUpdateClass(SelectedClass);
      handleDatabaseDeleteNote(SelectedNote, SelectedClass.id, SelectedNote.id);

      return newData;
    });

    SetSelectedNote(null);
  };
  // update the points
  useEffect(() => {
    const sendIDToGame = async () => {
      let userUID = user.uid;
      const url = "http://localhost:1234/api/data";
      console.log(process.env.REACT_APP_API_DOMAIN);

      const id = { userUID };
      await fetch(url, {
        method: "post",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json", // Make sure to set the content type of the request body
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      })
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("There was an error sending the request:", error);
        });
    };
    sendIDToGame();
  });

  const handleDeleteSharedNote = () => {
    // callback function that recieves the previous state
    setData((prevData) => {
      // Create a copy of the previous data and save to new data
      const newData = { ...prevData };

      // Find the index of the note to be deleted in the notes array of the shared notes
      const noteIndex = newData.sharedNotes.findIndex(
        (note) => note.id === SelectedNote.id
      );
      if (noteIndex !== -1) {
        //remove class from array
        newData.sharedNotes.splice(noteIndex, 1);
        // Return the updated data object
      }
      handleDatabaseDeleteSharedNote(SelectedNote);

      return newData;
    });

    SetSelectedNote(null);
  };

  // update the points
  useEffect(() => {
    const sendIDToGame = async () => {
      let userUID = user.uid;
      const url = "http://localhost:1234/api/data";
      console.log(process.env.REACT_APP_API_DOMAIN);

      const id = { userUID };
      await fetch(url, {
        method: "post",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json", // Make sure to set the content type of the request body
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      })
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("There was an error sending the request:", error);
        });
    };
    sendIDToGame();
  });
  // State to manage notification
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        });
        // Add the text to the note content
        if (text && SelectedNote) {
          const updatedNote = { ...SelectedNote };
          updatedNote.content += text;
          handleUpdateNote(updatedNote);
          setNotification({
            isVisible: true,
            message: "Text added to note content",
          });
        } else {
          setNotification({
            isVisible: true,
            message: "No text found in the image or no note selected",
          });
        }
      } catch (err) {
        console.error(err);
        setNotification({ isVisible: true, message: "Image upload failed" });
      } finally {
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    } else {
      setNotification({ isVisible: true, message: "No file selected" });
    }
  
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ isVisible: false, message: "" });
    }, 3000);
  };  

  let buffer = 0;
  //passed into Loading component to determine if it is loading or not.
  const [connected, setConnected] = useState(false);
  //timer that checks server status every 2000ms
  const interval = 1000;
  useEffect(() => {
    const timer = setInterval(testConnection, interval);
    return () => clearInterval(timer);
  }, []);

  async function testConnection() {
    await fetch(process.env.REACT_APP_API_DOMAIN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
      .then((data) => {
        if (data.status == 200) {
          //if successfully connects then sets the buffer back to 0;
          buffer = 0;
          setConnected(buffer);
        }
      })
      .catch((error) => {
        setConnected(buffer++);
      });
  }

  useEffect(() => {
    const fetchTasksAndData = async () => {
      await getDatabaseTasks(user.uid);
      setData(dataInData);
      console.log("get DB data in mainpage", dataInData.tasks);
    };
    fetchTasksAndData();
  }, connected);

  return (
    <div className="mainpage">
      <div className="error_msg">{error}</div>
      <Loading buffer={connected} />
      {/* header without log in/sign up buttons, with sign out button */}
      <Header
        showButtons={false}
        showDarkModeButton={true}
        showDashBoardButtons={true}
        tasks={dataInData.tasks}
        uid={user.uid}
      />
  
      {/* viewport so that it's responsive*/}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      {/* style import from google fonts */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');`}
      </style>
  
      {/* Side Nav component */}
      <SideNav
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        onSelectClass={handleSelectClass}
        onSelectNote={handleSelectNote}
        className="classmenu"
        data={data}
        onShareNote={handleIsShare}
        updateNote={handleUpdateNote}
        updateClass={handleUpdateClass}
      />
  
      {/* Note component */}
      <Note
        selectedClass={SelectedClass}
        selectedNote={SelectedNote}
        updateNote={handleUpdateNote}
        updateClass={handleUpdateClass}
        updateProgress={updateNoteProgress}
        progress={progress}
        isReset={reset}
        isShareNote={isShared}
        uid={user.uid}
      />
  
      <ProgressGameBar progress={progress} onButtonClick={handleGameButtonClick} />
  
      <GameModal isOpen={isGameOpen} onClose={handleGameClose} />
  
      {SelectedClass && SelectedNote && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={handleShareClose}
          noteId={SelectedNote.id}
          classId={SelectedClass.id}
          addNew={handleNoteShared}
          uid={user.uid}
        />
      )}
  
      {isShared === true && SelectedNote && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={handleShareClose}
          noteId={SelectedNote.id}
          uid={user.uid}
        />
      )}
  
      {/* delete button component */}
      <DeleteButton
        handleDeleteButton={handleDeleteButton}
        handleDeleteClass={handleDeleteClass}
        handleDeleteNote={handleDeleteNote}
        handleDeleteSharedNote={handleDeleteSharedNote}
        isExpanded={isExpanded}
        SelectedNote={SelectedNote}
        SelectedClass={SelectedClass}
        isShareNote={isShared}
      />
  
      {SelectedNote !== null && (
        <div className="button-div">
          {/*  <Button
            onClick={handleDatabaseUpdateClass(SelectedClass)}
            className="saveshare-button">
            Save Note
          </Button> */}
          <Button className="saveshare-button" onClick={handleShareButtonClick}>
            Share
          </Button>
  
          {/* Image to Text button */}
          <Button className="image-to-text-button" onClick={() => fileInputRef.current.click()}>
            Image to Text
          </Button>
        </div>
      )}
  
      <div className="notification">
        {notification.isVisible && notification.message}
      </div>
  
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );  
}

export default Mainpage;
