const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  writeUserData: async function (user) {
    // check UID is not being used
    var randNum;
    do {
      var matchFound = false;
      randNum = Math.floor(Math.random() * 9000000000) + 1000000000;
      await this.getInfo(randNum)
        .then((res) => {
          console.log(res);
          if (res != null) {
            matchFound = true;
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } while (matchFound);

    // insert into DB
    const uid = randNum;
    console.log(uid);
    console.log(user);
    db.ref("users/" + uid).set({
      uid: uid,
      username: user.username,
      email: user.email,
      password: user.password,
      classes: "",
    });
  },

  getInfo: async function (uid) {
    const ref = db.ref("/users/" + uid);
    const snapshot = await ref.once("value");
    return snapshot.val();
  },

  getUserFromEmail: async function (email) {
    const ref = db.ref("/users/");
    const snapshot = await ref.once("value");

    let userData = null;
    snapshot.forEach((userSnapshot) => {
      const user = userSnapshot.val();
      if (user.email === email) {
        userData = user;
      }
    });

    return userData;
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
      //remove class
      await db
        .ref("/users/" + uid)
        .child(classId)
        .remove();
      return ref;
    }
  },

  removeNote: async function (uid, classId, noteId) {
    let noteFound = null;
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
            noteFound = note.val();
            db.ref("/users/" + uid)
              .child(classId)
              .child("notes")
              .child(key)
              .remove();
            return noteFound;
          }
        });
      }
      return noteFound;
    }
  },
  setSharedNote: async function (uid, classId, noteId) {
    //retrieves oldNote and removes it from users private notes
    let oldNote = await this.removeNote(uid, classId, noteId);
    //adds old owner as owner
    oldNote.owner = uid;
    console.log(oldNote);

    //adds to shared notes database:
    const ref = db.ref("sharedNotes");
    await ref.update(oldNote);
  },
};
