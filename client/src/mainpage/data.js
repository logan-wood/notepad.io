export const data = {
  classes: [
    {
      id: 1,
      name: "Class 1",
      notes: [
        {
          id: 1,
          title: "Subnote 1",
          content:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name o",
        },
        {
          id: 2,
          title: "Subnote 2",
          content:
            "Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached thetest",
        },
      ],
      noteSize: 2,
    },
    {
      id: 2,
      name: "Class 2",
      notes: [
        {
          id: 1,
          title: "Subnote 1",
          content:
            "Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the",
        },
        { id: 2, title: "Subnote 2", content: "test" },
      ],
      noteSize: 2,
    },
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
