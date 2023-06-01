import React, { useRef, useState, useEffect } from "react";
import arrow from "../../assets/lefticon.png";
import {
  addNewClass,
  addNewNote,
  updateClassData,
  updateNoteData,
} from "./data";
import { v4 as uuidv4 } from "uuid";

const SideNav = ({
  isOpen,
  toggleNav,
  onSelectClass,
  onSelectNote,
  data,
  isSharedTrue,
  onShareNote,
}) => {
  // set states for classes, notes and open class using the useState hook from react
  const [selectClass, setSelectClass] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [isShared, setIsShared] = useState(isSharedTrue);

  const [openClasses, setOpenClasses] = useState([]);
  const [isNoteEditing, setIsNoteEditing] = useState("");
  const [isClassEditing, setIsClassEditing] = useState("");

  const [editingClassName, setEditingClassName] = useState(false);
  const [editingNoteTitle, setEditingNoteTitle] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClasses = data.classes.filter(({ name, notes }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseSearchTerm) ||
      notes.some(
        (note) =>
          note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          note.content.toLowerCase().includes(lowerCaseSearchTerm) // Include note content in the search
      )
    );
  });

  const filteredSharedNotes = data.sharedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) // Include note content in the search
  );

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

    // Clear the search term
    setSearchTerm("");

    // Reset the selected note
    setSelectNote(null);
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
    onSelectClass(classObj);
  };

  const handleFinishClassNameChange = (id) => {
    const classObj = data.classes.find((classObj) => classObj.id === id);
    setIsClassEditing(false);
    setSelectClass(classObj);

    updateClassData(classObj.id, classObj);
    onSelectClass(classObj);
  };

  //handle for changing class name on change
  const handleNoteTitleChange = (e, id) => {
    if (selectClass) {
      const selectNote = selectClass.notes.find((note) => note.id === id);
      selectNote.title = e.target.value;
      setSelectNote(selectNote);
      setEditingNoteTitle(e.target.value);
      onSelectNote(selectNote);
    }
  };
  const handleFinishNoteTitleChange = (ClassObjId, id) => {
    if (selectClass) {
      const noteObj = selectClass.notes.find((note) => note.id === id);
      setIsNoteEditing(false);
      updateNoteData(ClassObjId, noteObj.id, noteObj);
      onSelectNote(selectNote);
    }
  };
  //effect hook that updates note title and content when selected note prop is passed through

  // handler for creating a new note
  const handleNewNote = (id) => {
    setIsShared(false);
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
    onShareNote(false); //  callback function with the updated value
  };

  //checks if a class is open
  const isClassOpen = (classid) => {
    return openClasses.includes(classid);
  };

  // handler for selecting a note\
  const handleSelectNote = (id) => {
    setIsShared(false);

    if (selectClass) {
      const selectNote = selectClass.notes.find((note) => note.id === id);
      setEditingNoteTitle(selectNote.title);

      if (selectNote) {
        setSelectNote(selectNote);
        onSelectNote(selectNote);
      }
    }
    onShareNote(false); //  callback function with the updated value
  };

  const handleSelectShareNote = (id) => {
    setIsShared(true);

    const selectSharedNote = data.sharedNotes.find(
      (shareNoteObj) => shareNoteObj.id === id
    );
    setEditingNoteTitle(selectSharedNote.title);

    setSelectNote(selectSharedNote);
    console.log("Select Shgared note", selectSharedNote);
    setSelectNote(selectSharedNote);
    onSelectNote(selectSharedNote);
    setOpenClasses([]);
    setSelectClass(null);
    onSelectClass(null);
    onShareNote(true); //  callback function with the updated value
  };

  //checks if a class button is active
  const isClassButtonActive = (classid) => {
    return selectClass && selectClass.id === classid;
  };

  const isSelectNoteButtonActive = (noteId) => {
    return selectNote && selectNote.id === noteId;
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

  // Check if a search term has been entered and there are no results
  const showNoResults = searchTerm !== '' && filteredClasses.length === 0 && filteredSharedNotes.length === 0;

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow} alt="Toggle Navigation" />
      </button>
      <div>
        <h1>My Classes</h1>
        <hr />
        <div className="classDiv">
          {showNoResults ? (
            <p>No results found.</p>
          ) : (
            filteredClasses.map((classItem) => {
              const filteredNotes = classItem.notes.filter(
                (note) =>
                  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  note.content.toLowerCase().includes(searchTerm.toLowerCase())
              );
              return (
                <div key={classItem.id}>
                  {isClassEditing && selectClass && selectClass.id === classItem.id ? (
                    <input
                      className="sideNavEditing"
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
                        handleSelectClass(classItem.id);
                        setIsClassEditing(true);
                      }}
                      className={`classButton ${isClassButtonActive(classItem.id) ? "active" : ""}`}
                      draggable
                    >
                      {classItem.name}
                    </button>
                  )}
                  {isClassOpen(classItem.id) && (
                    <>
                      <button className="newNoteButton" onClick={() => handleNewNote(classItem.id)}>
                        + new Note
                      </button>
  
                      {filteredNotes.length > 0 && (
                        <ul>
                          {filteredNotes.map((note) => (
                            <li key={note.id}>
                              <div className="noteIndent">
                                {isNoteEditing && selectNote && selectNote.id === note.id ? (
                                  <input
                                    className="sideNavEditing"
                                    type="text"
                                    value={isNoteEditing ? editingNoteTitle : note.title}
                                    onChange={(e) => handleNoteTitleChange(e, note.id)}
                                    onKeyUp={(e) => {
                                      if (e.key === "Enter") {
                                        handleFinishNoteTitleChange(classItem.id, note.id);
                                      }
                                    }}
                                    onBlur={() => {
                                      handleFinishNoteTitleChange(classItem.id, note.id);
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
                                    className={`noteButton ${isNoteButtonActive(note.id, classItem.id) ? "active" : ""}`}
                                    draggable
                                  >
                                    {note.title}
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
        {data.sharedNotes.length > 0 && (
          <>
            <h4>My Shared Notes</h4>
            <div className="sharedNoteDiv">
              <ul>
                {filteredSharedNotes.map((noteShare) => (
                  <li key={noteShare.id}>
                    <button
                      className={`noteButton ${isSelectNoteButtonActive(noteShare.id) ? "active" : ""}`}
                      onClick={() => {
                        handleSelectShareNote(noteShare.id);
                      }}
                      onDoubleClick={() => {
                        handleSelectShareNote(noteShare.id);
                        setIsClassEditing(true);
                      }}
                      draggable
                    >
                      {noteShare.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="sideNavButtonDiv">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="newClassButton" onClick={handleNewClass}>
          + new class
        </button>
      </div>
    </div>
  );
};  

export default SideNav;
