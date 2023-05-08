import React, { Component } from "react";

class Notedata extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
    };
  }

  //caklls getData when component is mounted
  componentDidMount() {
    this.getDatabaseData();
    console.log("componentDidMountstate",this.state);


  }
  
  //call database
  getDatabaseData = () => {
    const url = "http://localhost:8080/user/12345/getInfo";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
      .then((response) => {
        console.log("response",response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log("data log",JSON.stringify(data));

        const initialArray = Object.values(data);
        const updatedClasses = initialArray.map((initClass) => {
            console.log("updatedclasses log",JSON.stringify(data));

            if (Array.isArray(initClass.notes)) {

                return initClass;
              } else if (initClass.notes && typeof initClass.notes === "object") {

                const newNotesArray = [];
                for (const initialNotes of Object.values(initClass.notes)) {
                  newNotesArray.push(initialNotes);
                }

                return { ...initClass, notes: newNotesArray };
              } else {
                return initClass;
          }
        });
        console.log("uisarray",JSON.stringify(updatedClasses));

        this.setState({ classes: updatedClasses });

        console.log("called state",this.state);

      })
      .catch((error) => {
        console.error("There was an error sending the request:", error);
      });
  };

  addNewClass = (newClass) => {
    const updatedClasses = [...this.state.classes, newClass];
    this.setState({ classes: updatedClasses });
  };

  addNewNote = (classID, newNote) => {
    const classIndex = this.state.classes.findIndex(
      (classObj) => classObj.id === classID
    );
    if (classIndex !== -1) {
      const updatedClasses = [...this.state.classes]; // Make a copy of the classes array
      const classObj = updatedClasses[classIndex];
      classObj.notes.push(newNote);
      classObj.noteSize++;
      this.setState({ classes: updatedClasses });
    }
  };

  //function that updates the data with changes made to the notes
  updateNoteData = (classId, noteId, updatedNote) => {
    const updatedClasses = [...this.state.classes]; // Make a copy of the classes array
    const classIndex = this.state.classes.findIndex(
      (cls) => cls.id === classId
    );
    const noteIndex = this.state.classes[classIndex].notes.findIndex(
      (note) => note.id === noteId
    );

    updatedClasses[classIndex].notes[noteIndex] = updatedNote;
    this.setState({ classes: updatedClasses });
  };

  //function that updates the data with changes made to the notes
  updateClassData = (classId, updatedClass) => {
    const updatedClasses = [...this.state.classes]; // Make a copy of the classes array

    const classIndex = this.state.classes.findIndex(
      (cls) => cls.id === classId
    );

    updatedClasses[classIndex].name = updatedClass.name;
    this.setState({ classes: updatedClasses });
  };
  render() {
    return null; // don't render anything
  }
}
export default Notedata;
