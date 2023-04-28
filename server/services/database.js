const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  addNewUser: function (uid) {
    db.ref("users/" + uid).set({
      creationDate: new Date().toISOString(),
    });
    return "Success";
  },
  getUserData: function (uid) {
    const ref = db.ref("/users/" + uid);
    return ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
  updateClassNote: function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child("classes");
    console.log();
    const updates = {
      [classToUpdate.title]: {
        id: classToUpdate.id,
        content: classToUpdate.content,
      },
    };
    ref.update(updates);
    return ref;
  },
  getAllClassNotes: function (uid) {
    const ref = db.ref("/users/" + uid + "/classes");
    return ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
};
