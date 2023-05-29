export const dataInData = {
  classes: [
    
  ],
};
export default dataInData;

export const findNoteIndex = (notes, id) => {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return i;
    }
  }
  return -1;
};

export const addNewClass = (newClass) => {
  dataInData.classes.push(newClass);
};

export const setClassesData = (updatedClasses) => {
  dataInData.classes= updatedClasses;
};
export const addNewNote = (classID, Note) => {
  const classObj = dataInData.classes.find((classObj) => classObj.id === classID);
  if (classObj) {
    classObj.notes.push(Note);
    classObj.noteSize++;
  }
};

//function that updates the data with changes made to the notes
export const updateNoteData = (classId, noteId, updatedNote) => {
  const classIndex = dataInData.classes.findIndex((cls) => cls.id === classId);
  const noteIndex = dataInData.classes[classIndex].notes.findIndex(
    (note) => note.id === noteId
  );

  dataInData.classes[classIndex].notes[noteIndex] = updatedNote;
};

//function that updates the data with changes made to the notes
export const updateClassData = (classId,  updatedClass) => {
  const classIndex = dataInData.classes.findIndex((cls) => cls.id === classId);
 

  dataInData.classes[classIndex].name = updatedClass.name;
};

//call database
export const getDatabaseData = () => {
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
          if (initClass.id && initClass.name && initClass.noteSize !== undefined) {

          if (Array.isArray(initClass.notes)) {

              return initClass;
            } else if (initClass.notes && typeof initClass.notes === "object") {

              const newNotesArray = [];
              for (const initialNotes of Object.values(initClass.notes)) {
                newNotesArray.push(initialNotes);
              }
              console.log("initclass",initClass);

              return { ...initClass, notes: newNotesArray };
            } else {
              console.log("initclass",initClass);

              return { ...initClass, notes: [] };
              
        }
      }else{
        return null;
      }}).filter(obj => obj !== null); // filter out the null/undefined values
  
      console.log("uisarray",JSON.stringify(updatedClasses));
      dataInData.classes= updatedClasses;
      console.log("called state",dataInData.classes);
    })
    .catch((error) => {
      console.error("There was an error sending the request:", error);
    });
};


