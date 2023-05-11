import React, { useRef, useState, useContext } from "react";
import arrow from "../assets/lefticon.png";
import {
  addNewClass,
  addNewNote,
  updateClassData,
  updateNoteData,
} from "./data";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { addNewClass, addNewNote } from "./data";


const SideNav = ({ isOpen, toggleNav, onSelectClass, onSelectNote, data }) => {
  // set states for classes, notes and open class using the useState hook from react
  const [selectClass, setSelectClass] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [openClasses, setOpenClasses] = useState([]);
  const [isNoteEditing, setIsNoteEditing] = useState("");
  const [isClassEditing, setIsClassEditing] = useState("");

  const [editingClassName, setEditingClassName] = useState(false);
  const [editingNoteTitle, setEditingNoteTitle] = useState(false);

  const user = useSelector((state) => state.user);


  const draggingStart = (e, position) =>{
    draggingItem.current = position;
    console.log(e.target.innerHTML);
  }
  //unique ids for the
  //TODO:
  // CREATE NEW CLASS HANDLER
  //Handle for creating a new class
  const handleNewClass = () => {
    const newClass = {
      id: uuidv4(),
      name: `New Class`,
      notes: [],
      noteSize: 0,
    };
    // calling the addNewClass function from data.js  and passing in the new class
    addNewClass(newClass);
    // calling the onSelectClass function and passing in the new class
    onSelectClass(newClass);
  };

  //Handles selecting a class
  const handleSelectClass = (classId) => {
    const selectClass = data.classes.find(
      (classObj) => classObj.id === classId
    );
    setEditingClassName(selectClass.name);

    setSelectClass(selectClass);
    setSelectNote(null);
    onSelectClass(selectClass);
    onSelectNote(null);

    // stops displaying the notes in a class if a different class is selected.
    // if a class is selected it calls the open note function
    if (openClasses.includes(classId)) {
      setOpenClasses(openClasses.filter((id) => id !== classId));
    } else {
      setOpenClasses([classId]);
    }
  };

  //handle for changing class name on change
  const handleClassNameChange = (e, id) => {
    const classObj = data.classes.find((classObj) => classObj.id === id);
    classObj.name = e.target.value;
    setEditingClassName(e.target.value);
    setSelectClass(classObj);
  };

  const handleFinishClassNameChange = (id) => {
    const classObj = data.classes.find((classObj) => classObj.id === id);
    setIsClassEditing(false);
    updateClassData(classObj.id, classObj);
  };

  //handle for changing class name on change
  const handleNoteTitleChange = (e, id) => {
    const selectNote = selectClass.notes.find((note) => note.id === id);
    selectNote.title = e.target.value;
    setEditingNoteTitle(e.target.value);
    setSelectNote(selectNote);
  };
  const handleFinishNoteTitleChange = (ClassObjId, id) => {
    const noteObj = selectClass.notes.find((note) => note.id === id);
    setIsNoteEditing(false);
    updateNoteData(ClassObjId, noteObj.id, noteObj);
  };

  // handler for creating a new note
  const handleNewNote = (id) => {
    const classObj = data.classes.find((classObj) => classObj.id === id);
    if (classObj) {
      const newNote = {
        id: uuidv4(),
        title: `new Note`,
        content: ``,
      };
      // call addNewNote function from data.js and pass classObj.id and newNote as arguments
      addNewNote(classObj.id, newNote);
      onSelectNote(newNote);
    } else {
      console.log("error with handle note");
    }
  };

  //checks if a class is open
  const isClassOpen = (classid) => {
    return openClasses.includes(classid);
  };

  // handler for selecting a note\
  const handleSelectNote = (id) => {
    if (selectClass) {
      const selectNote = selectClass.notes.find((note) => note.id === id);
      setEditingNoteTitle(selectNote.title);

      if (selectNote) {
        setSelectNote(selectNote);
        onSelectNote(selectNote);
      }
    }
  };

  //checks if a class button is active
  const isClassButtonActive = (classid) => {
    return selectClass && selectClass.id === classid;
  };

  //checks if a note button is active
  const isNoteButtonActive = (noteid, classid) => {
    //Check if the selected note has the selected note id and the selected class id is also selected
    return (
      selectNote &&
      selectNote.id === noteid &&
      selectClass &&
      selectClass.id === classid
    );
  };

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow}></img>
      </button>
      <div>
        {/* Please delete this later and make it look good just putting this here to show the login stuff working */}
        {/* <div>{user ? (<p>{user.username}</p>) : (<p>no user signed in...</p>)}</div> */}

        <h1>My Classes</h1>
        <hr></hr>
        <div className="classDiv">
          {data.classes.map((classItem) => (
            <div key={classItem.id}>
              {isClassEditing && selectClass.id === classItem.id ? (
                <input
                  type="text"
                  value={isClassEditing ? editingClassName : classItem.name}
                  onChange={(e) => handleClassNameChange(e, classItem.id)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleFinishClassNameChange(classItem.id);
                    }
                  }}
                  onBlur={() => {
                    setIsClassEditing(false);
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    handleSelectClass(classItem.id);
                  }}
                  onDoubleClick={() => {
                    setIsClassEditing(true);
                  }}
                  className={`classButton ${
                    isClassButtonActive(classItem.id) ? "active" : ""
                  }`}
                  draggable
                >
                  {classItem.name}
                </button>
              )}
              {isClassOpen(classItem.id) && (
                <>
                  <button
                    className="newNoteButton"
                    onClick={() => handleNewNote(classItem.id)}
                  >
                    + new Note
                  </button>

                  {classItem.notes && (
                    <ul>
                      {classItem.notes.map((note) => (
                        <li key={note.id}>
                          {isNoteEditing && selectNote.id === note.id ? (
                            <input
                              type="text"
                              value={
                                isNoteEditing ? editingNoteTitle : note.title
                              }
                              onChange={(e) =>
                                handleNoteTitleChange(e, note.id)
                              }
                              onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                  handleFinishNoteTitleChange(
                                    classItem.id,
                                    note.id
                                  );
                                }
                              }}
                              onBlur={() => {
                                setIsNoteEditing(false);
                              }}
                            />
                          ) : (
                            <button
                              onClick={() => {
                                handleSelectNote(note.id);
                              }}
                              onDoubleClick={() => {
                                setIsNoteEditing(true);
                              }}
                              className={`noteButton ${
                                isNoteButtonActive(note.id, classItem.id)
                                  ? "active"
                                  : ""
                              }`}
                              draggable
                            >
                              {note.title}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sideNavButtonDiv">
        <button className="newClassButton" onClick={handleNewClass}>
          + new class
        </button>
      </div>
    </div>
  );
};

export default SideNav;
