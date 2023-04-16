import React from "react";
import arrow from "../assets/lefticon.png";

const SideNav = ({ isOpen, toggleNav, onSelectClass, onSelectNote, data }) => {
  // set states for classes, notes and open class using the useState hook from react
  const [selectClass, setSelectClass] = React.useState(null);
  const [selectNote, setSelectNote] = React.useState(null);
  const [openClasses, setOpenClasses] = React.useState([]);

  //Handles selecting a class
  const handleSelectClass = (id) => {
    const selectClass = data.classes.find((classObj) => classObj.id === id);
    setSelectClass(selectClass);
    setSelectNote(null);
    onSelectClass(selectClass);

    // stops displaying the notes in a class if a different class is selected.
    // if a class is selected it calls the open note function
    if (openClasses.includes(id)) {
      setOpenClasses(openClasses.filter((id) => id !== id));
    } else {
      setOpenClasses([id]);
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

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow}></img>
      </button>
      <div>
        <h1>My Classes</h1>
        <hr></hr>
        <div className="classDiv">
          {data.classes.map((classItem) => (
            <div key={classItem.id}>
              <h3>
                {" "}
                <button
                  onClick={() => handleSelectClass(classItem.id)}
                  className={`classButton ${
                    isClassButtonActive(classItem.id) ? "active" : ""
                  }`}
                >
                  {classItem.name}
                </button>
              </h3>
              {isClassOpen(classItem.id) && (
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
                      >
                        {note.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sideNavButtonDiv">
        <button className="yellowbutton">+ new class</button>
      </div>
    </div>
  );
};

export default SideNav;
