export const data = {
  classes: [
    
  ],
};

export const findNoteIndex = (note, id) => {
  for (let i = 0; i < note.length; i++) {
    if (note[i].id === i) {
      return i;
    }
  }
  return -1;
};

export const addNewClass = (newClass) => {
  data.classes.push(newClass);
};

export const addNewNote = (classID, Note) => {
  const classObj = data.classes.find((classObj) => classObj.id === classID);
  if (classObj) {
    classObj.notes.push(Note);
    classObj.noteSize++;
  }
};

//function that updates the data with changes made to the notes
export const updateNoteData = (classId, noteId, updatedNote) => {
  const classIndex = data.classes.findIndex((cls) => cls.id === classId);
  const noteIndex = data.classes[classIndex].notes.findIndex(
    (note) => note.id === noteId
  );

  data.classes[classIndex].notes[noteIndex] = updatedNote;
};

//function that updates the data with changes made to the notes
export const updateClassData = (classId,  updatedClass) => {
  const classIndex = data.classes.findIndex((cls) => cls.id === classId);
 

  data.classes[classIndex].name = updatedClass.name;
};
