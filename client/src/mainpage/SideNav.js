import React, { useContext } from "react";
import arrow from "../assets/lefticon.png";
import { data } from "./data";
import { useSelector, useDispatch } from "react-redux";
import React ,{useRef}from "react";
import arrow from "../assets/lefticon.png";
import { addNewClass, addNewNote } from "./data";
import { v4 as uuidv4 } from 'uuid';

const SideNav = ({ isOpen, toggleNav, onSelectClass, onSelectNote, data }) => {
  // set states for classes, notes and open class using the useState hook from react
  const [selectClass, setSelectClass] = React.useState(null);
  const [selectNote, setSelectNote] = React.useState(null);
  const [openClasses, setOpenClasses] = React.useState([]);
  const draggingItem = useRef();

  // user object
  const dispatch = useDispatch();
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
    addNewClass(newClass);
    onSelectClass(newClass);
  };
  //Handles selecting a class
  const handleSelectClass = (id) => {
    const selectClass = data.classes.find((classObj) => classObj.id === id);
    setSelectClass(selectClass);
    setSelectNote(null);
    onSelectClass(selectClass);
    onSelectNote(null);
    // stops displaying the notes in a class if a different class is selected.
    // if a class is selected it calls the open note function
    if (openClasses.includes(id)) {
      setOpenClasses(openClasses.filter((id) => id !== id));
    } else {
      setOpenClasses([id]);
    }
  };

  //CREATE NEW NOTE HANDLER

  const handleNewNote = (id) => {
    const classObj = data.classes.find((classObj) => classObj.id === id);
    if (classObj) {
      const newNote = {
        id: uuidv4(),
        title: `new Note`,
        content: ``,
      };
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

  const handleSelectNote = (id) => {
    if (selectClass) {
      const selectNote = selectClass.notes.find((note) => note.id === id);
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

  const logoutUser = () => {
    fetch(process.env.REACT_APP_API_DOMAIN + '/logoutUser', {
      method: 'get',
      headers: {
        'Cookie': document.cookie
      }
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'CLEAR_USER' })
      }
    })
  }

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow}></img>
      </button>
      <div>
        {/* Please delete this later and make it look good just putting this here to show the login stuff working */}
        <div>{user ? (<p>Welcome back, {user.username}</p>) : (<p>no user signed in...</p>)}</div>
        <div><button onClick={() => logoutUser()}>Logout User</button></div>
        <h1>My Classes</h1>
        <hr></hr>
        <div className="classDiv">
          {data.classes.map((classItem) => (
            <div key={classItem.id}>
              <h3>
                <button
                  onClick={() => handleSelectClass(classItem.id)}
                  className={`classButton ${
                    isClassButtonActive(classItem.id) ? "active" : ""
                  }`}
                draggable>
                  {classItem.name}
                </button>
              </h3>
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
                        <button
                          onClick={() => handleSelectNote(note.id)}
                          className={`noteButton ${
                            isNoteButtonActive(note.id, classItem.id)
                              ? "active"
                              : ""
                          }`}
                          draggable>
                          {note.title}
                        </button>
                      </li>
                    ))}
                  </ul>
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
