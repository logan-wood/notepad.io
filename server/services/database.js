const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  addNewUser: async function (uid) {
    await db.ref("users/" + uid).set({
      creationDate: new Date().toISOString(),
    });
    return "User successfully";
  },
  getInfo: async function (uid) {
    const ref = db.ref("/users/" + uid);
    return await ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
  //adds new user if uid doesn't exist, otherwise updates class (overwrites if exists; creates if doesn't exist already).
  updateClass: async function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child(classToUpdate.id);
    const snapshot = await db.ref("/users/" + uid).once("value");
    if (!snapshot.exists()) {
      //user doesn't exist - creating new user
      this.addNewUser(uid);
      await ref.update(classToUpdate);
      return ref;
    } else {
      await ref.update(classToUpdate);
      return ref;
    }
  },
  removeClass: async function (uid, classId) {
    const ref = await db
      .ref("/users/" + uid)
      .child(classId)
      .once("value");
    if (!ref.exists()) {
      //class doesnt exist; do nothing
      return ref;
    } else {
      //remove class
      await db
        .ref("/users/" + uid)
        .child(classId)
        .remove();
      return ref;
    }
  },

  removeNote: async function (uid, classId, noteId) {
    const ref = (
      await db
        .ref("/users/" + uid)
        .child(classId)
        .once("value")
    ).exists();
    if (!ref) {
      //class doesnt exist; do nothing
      return ref;
    } else {
      //Class found
      //loop to find notes
      const notes = await db
        .ref("/users/" + uid)
        .child(classId)
        .child("notes")
        .once("value");
      if (notes.exists()) {
        //notes array exists
        notes.forEach((note) => {
          const key = note.key;
          const value = note.val();
          //correct note is found.
          if (value.id == noteId) {
            //remove note
            db.ref("/users/" + uid)
              .child(classId)
              .child("notes")
              .child(key)
              .remove();
          }
        });
      }
      return ref;
    }
  },
};
