import React, { useRef, useState } from "react";
import arrow from "../assets/lefticon.png";
import {
  addNewClass,
  addNewNote,
  updateClassData,
  updateNoteData,
} from "./data";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSearchResults,
  cancelSearch,
} from "../redux/userStore";

const SideNav = ({ isOpen, toggleNav, onSelectClass, onSelectNote, data }) => {
  // set states for classes, notes and open class using the useState hook from react
  const [selectClass, setSelectClass] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [openClasses, setOpenClasses] = useState([]);
  const [isNoteEditing, setIsNoteEditing] = useState("");
  const [isClassEditing, setIsClassEditing] = useState("");

  const [editingClassName, setEditingClassName] = useState(false);
  const [editingNoteTitle, setEditingNoteTitle] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchResults = useSelector((state) => state.search.searchResults);
  
  const dispatch = useDispatch();

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
  };

  const handleSearch = () => {
    const filteredNotes = data.classes.filter((classItem) => {
      const matchingNotes = classItem.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchingNotes.length > 0;
    });

    dispatch(setSearchResults(filteredNotes));
  };

  const handleCancelSearch = () => {
    dispatch(cancelSearch());
  };
  
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

  const filteredClasses = searchResults.length > 0 ? searchResults : data.classes;

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow} alt="Toggle Navigation"></img>
      </button>
      <div>
        <h1>My Classes</h1>
        <hr></hr>
        <div className="classDiv">
          {filteredClasses.map((classItem) => {
            return (
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
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="sideNavButtonDiv">
          {searchResults.length > 0 && (
            <button className="cancelSearchButton" onClick={handleCancelSearch}>
              Cancel Search
            </button>
          )}
          <button className="newClassButton" onClick={handleNewClass}>
            + new class
          </button>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search notes..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
