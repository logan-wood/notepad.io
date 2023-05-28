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
    console.log(ref);

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
    let noteMap = {};
    let userMap = {};
    userMap[uid] = uid;
    oldNote.users = userMap;
    noteMap[noteId] = oldNote;
    console.log(noteMap);

    //adds to shared notes database:
    const ref = db.ref("sharedNotes");
    await ref.update(noteMap);
  },

  addSharedUser: async function (noteId, newUid) {
    //updates note under /sharedNotes database with newUid.
    const ref = db.ref("/sharedNotes/" + noteId);
    console.log("logging ref:");
    console.log(ref);
    console.log("noteID: " + noteId);
    let note = (await ref.once("value")).val();
    console.log("logging note:");
    console.log(note);
    if (note.users[newUid] == null) {
    }
    ref.update(note);

    //updates the user under /users database with a reference to the noteId that was shared with them.
    let newUser = await this.getInfo(newUid);
    let notes = newUser.sharedNotes;
    if (notes == null) {
      let notesMap = {};
      notesMap[noteId] = noteId;
      newUser.sharedNotes = notesMap;
    } else {
      notes[noteId] = noteId;
    }
    db.ref("/users/" + newUid).update(newUser);
  },

  retrieveSharedNotes: async function (uid) {
    let finalNotes = new Array();
    //updates note under /sharedNotes database with newUid.
    const ref = db.ref("/sharedNotes/");
    let notes = (await ref.once("value")).val();
    // console.log(notes);
    Object.keys(notes).forEach((noteKey) => {
      const note = notes[noteKey];
      const users = note.users;

      // Iterate through the inner object using Object.keys()
      Object.keys(users).forEach((userKey) => {
        const user = users[userKey];
        if (user == uid) {
          finalNotes.push(note);
          // console.log(note);
          console.log(finalNotes);
        }
      });
    });
    return finalNotes;
  },

  removeSharedNote: async function ( noteId) {
    const ref = (
      await db
      .ref("/sharedNotes/")
      .child(noteId)
      .once("value")
    ).exists();
    if (!ref) {
      //sharedNote doesnt exist; do nothing
      return ref;
    } else {
      //remove sharedNote
      await db.ref("/sharedNotes/").child(noteId).remove();
      return ref;
    }
  },

  addTask: async function (uid, task) {
    const ref = db.ref("/users/" + uid).child("tasks");
    await ref.update(task);
  },
  getTasks: async function (uid) {
    const ref = db.ref("/users/" + uid + "/tasks");
    const snapshot = await ref.once("value");
    return snapshot.val();
  },
  saveTasks: async function (uid, tasks) {
    console.log(tasks);
    const ref = db.ref("/users/" + uid);
    await ref.update(tasks);
  },
  deleteTask: async function (uid, taskId) {
    const ref = db.ref("/users/" + uid + "/tasks/").child(taskId);
    ref.remove();
    return "Success";
  },

  //remove User from sharednote
  removeSharedUser: async function (uid, noteId) {
    let userFound = null;
    const ref = (await db.ref("/sharedNotes/" + noteId).once("value")).exists();
    if (!ref) {
      //note doesnt exist; do nothing
      return ref;
    } else {
      //note found
      //loop to find users
      const users = await db
        .ref("/sharedNotes/" + noteId)
        .child("users")
        .once("value");
      if (users.exists()) {
        //notes array exists
        users.forEach((user) => {
          const key = user.key;
          const value = user.val();
          //correct note is found.
          if (key == uid) {
            //remove note
            userFound = user.val();
            db.ref("/sharedNotes/" + noteId)
              .child("users")
              .child(key)
              .remove();
            return userFound;
          }
        });
      }
      return userFound;
    }
  },
  //----
};
